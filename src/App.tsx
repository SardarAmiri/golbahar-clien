import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./theme";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import HomePage from "./pages/auth/private/home";
import ProfilePage from "./pages/auth/private/profile";
import PublicLayout from "./layouts/public-layout";
import PrivateLayout from "./layouts/private-layout";
import EventsPage from "./pages/auth/private/staff/events";
import CreateEventPage from "./pages/auth/private/staff/events/create";
import EditEventPage from "./pages/auth/private/staff/events/edit";
import EventInfoPage from "./pages/auth/private/event/index";
import UserBookingsPage from "./pages/auth/private/profile/bookings";
import AminBookings from "./pages/auth/private/staff/bookings";
import UsersPage from "./pages/auth/private/staff/users";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            }
          />
          <Route
            path="/register"
            element={
              <PublicLayout>
                <RegisterPage />
              </PublicLayout>
            }
          />
          <Route
            path="/"
            element={
              <PrivateLayout>
                <HomePage />
              </PrivateLayout>
            }
          />
          <Route
            path="/event/:id"
            element={
              <PrivateLayout>
                <EventInfoPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateLayout>
                <ProfilePage />
              </PrivateLayout>
            }
          />
          <Route
            path="/profile/bookings"
            element={
              <PrivateLayout>
                <UserBookingsPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/staff/events"
            element={
              <PrivateLayout>
                <EventsPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/staff/events/create"
            element={
              <PrivateLayout>
                <CreateEventPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/staff/events/edit/:id"
            element={
              <PrivateLayout>
                <EditEventPage />
              </PrivateLayout>
            }
          />
          <Route
            path="/staff/bookings"
            element={
              <PrivateLayout>
                <AminBookings />
              </PrivateLayout>
            }
          />
          <Route
            path="/staff/users"
            element={
              <PrivateLayout>
                <UsersPage />
              </PrivateLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
