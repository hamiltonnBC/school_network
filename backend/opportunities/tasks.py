from celery import shared_task
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from datetime import timedelta
from .models import Opportunity
from users.models import UserProfile


def send_email_notification(user, opportunities):
    """Send email notification to user about upcoming opportunities"""
    if not user.email:
        print(f"No email address for {user.username}")
        return False
    
    # Build email content
    subject = f"Upcoming Opportunity Deadlines - {len(opportunities)} Alert(s)"
    
    message_lines = [
        f"Hello {user.username},",
        "",
        f"You have {len(opportunities)} upcoming opportunity deadline(s):",
        ""
    ]
    
    today = timezone.now().date()
    for opportunity in opportunities:
        days_until_deadline = (opportunity.deadline - today).days
        
        if days_until_deadline == 0:
            urgency = "TODAY"
        elif days_until_deadline == 1:
            urgency = "TOMORROW"
        else:
            urgency = f"in {days_until_deadline} days"
        
        message_lines.append(f"🚨 '{opportunity.title}' ({opportunity.type}) - Due {urgency} ({opportunity.deadline})")
        
        if opportunity.posted_by:
            message_lines.append(f"   Posted by: {opportunity.posted_by}")
        
        if opportunity.notes:
            message_lines.append(f"   Notes: {opportunity.notes[:150]}...")
        
        message_lines.append("")
    
    message_lines.extend([
        "---",
        "To update your notification preferences, contact your administrator.",
        "",
        "Best regards,",
        "Opportunities Alert System"
    ])
    
    message = "\n".join(message_lines)
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False,
        )
        print(f"✅ Email sent to {user.username} ({user.email})")
        return True
    except Exception as e:
        print(f"❌ Failed to send email to {user.username}: {str(e)}")
        return False


@shared_task
def send_deadline_alerts():
    """
    Check for opportunities based on each user's individual preferences
    and send personalized notifications via their preferred method.
    """
    current_time = timezone.now()
    current_hour = current_time.hour
    today = current_time.date()
    
    # Find users who want alerts at this hour AND have notifications enabled
    users_to_alert = UserProfile.objects.filter(
        alert_time__hour=current_hour,
        enable_notifications=True
    )
    
    if not users_to_alert.exists():
        print(f"No users configured for alerts at {current_hour}:00")
        return f"No users to alert at {current_hour}:00"
    
    total_alerts_sent = 0
    email_count = 0
    slack_count = 0
    
    for user in users_to_alert:
        print(f"\n--- Processing alerts for {user.username} ---")
        
        # Calculate user's specific date range
        alert_end_date = today + timedelta(days=user.alert_days_ahead)
        
        # Get user's preferred opportunity types
        user_alert_types = user.get_alert_types_list()
        if not user_alert_types:
            print(f"No alert types configured for {user.username}")
            continue
        
        # Find opportunities matching user's criteria
        user_opportunities = Opportunity.objects.filter(
            deadline__gte=today,
            deadline__lte=alert_end_date,
            type__in=user_alert_types
        ).order_by('deadline')
        
        if not user_opportunities.exists():
            print(f"No matching opportunities for {user.username}")
            continue
        
        # Send notification based on user's preferred method
        if user.notification_method == 'email':
            if send_email_notification(user, user_opportunities):
                email_count += 1
                total_alerts_sent += len(user_opportunities)
        elif user.notification_method == 'slack':
            print(f"🔄 Slack notifications coming soon for {user.username}")
            # TODO: Implement Slack notifications
            slack_count += 1
        elif user.notification_method == 'none':
            print(f"🔇 {user.username} has notifications disabled")
        
        print(f"Processed {len(user_opportunities)} opportunities for {user.username}")
    
    summary = f"Processed alerts for {users_to_alert.count()} users: {email_count} emails sent, {slack_count} slack pending"
    print(f"\n📊 Summary: {summary}")
    return summary


@shared_task
def send_deadline_alerts_for_user(username):
    """
    Manually trigger deadline alerts for a specific user (useful for testing)
    """
    try:
        user = UserProfile.objects.get(username=username)
    except UserProfile.DoesNotExist:
        return f"User {username} not found"
    
    if not user.enable_notifications:
        return f"{username} has notifications disabled"
    
    today = timezone.now().date()
    alert_end_date = today + timedelta(days=user.alert_days_ahead)
    user_alert_types = user.get_alert_types_list()
    
    if not user_alert_types:
        return f"No alert types configured for {username}"
    
    user_opportunities = Opportunity.objects.filter(
        deadline__gte=today,
        deadline__lte=alert_end_date,
        type__in=user_alert_types
    ).order_by('deadline')
    
    if not user_opportunities.exists():
        return f"No matching opportunities for {username}"
    
    # Send notification based on user's preferred method
    if user.notification_method == 'email':
        if send_email_notification(user, user_opportunities):
            return f"✅ Sent email with {len(user_opportunities)} opportunities to {username}"
        else:
            return f"❌ Failed to send email to {username}"
    elif user.notification_method == 'slack':
        return f"🔄 Slack notifications coming soon for {username} ({len(user_opportunities)} opportunities ready)"
    elif user.notification_method == 'none':
        return f"🔇 {username} has notification method set to 'none'"
    
    return f"Unknown notification method for {username}"