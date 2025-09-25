import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

// Import pages (we'll create these)
import Dashboard from './pages/Dashboard'
import OpportunitiesList from './pages/OpportunitiesList'
import OpportunityDetail from './pages/OpportunityDetail'
import OpportunityForm from './pages/OpportunityForm'
import UserProfile from './pages/UserProfile'
import Settings from './pages/Settings'

// Import layout components
import PageLayout from './components/templates/PageLayout'

function App() {
  return (
    <Router>
      <Box minH="100vh" bg="bg">
        <PageLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/opportunities" element={<OpportunitiesList />} />
            <Route path="/opportunities/new" element={<OpportunityForm />} />
            <Route path="/opportunities/:id" element={<OpportunityDetail />} />
            <Route path="/opportunities/:id/edit" element={<OpportunityForm />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </PageLayout>
      </Box>
    </Router>
  )
}

export default App