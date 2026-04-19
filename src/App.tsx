import { ActiveSubscriptionRoute } from '@/components/auth/ActiveSubscriptionRoute';
import { PendingReviewRoute } from '@/components/auth/PendingReviewRoute';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PublicOnlyRoute } from '@/components/auth/PublicOnlyRoute';
import { SubscriptionPageRoute } from '@/components/auth/SubscriptionPageRoute';
import { PanelLayout } from '@/components/layout/panel-layout';
import { Toaster } from '@/components/ui/sonner';
import QueryProvider from '@/lib/utils/provider';
import { AuthLandingPage } from '@/pages/auth-landing-page';
import { BlogsPage } from '@/pages/blogs-page';
import { CourseDetailsPage } from '@/pages/course-details-page';
import { CoursesPage } from '@/pages/courses-page';
import { ForgotPasswordPage } from '@/pages/forgot-password-page';
import { HawssaReleasesPage } from '@/pages/hawssa-releases-page';
import { HomePage } from '@/pages/home-page';
import { LoginPage } from '@/pages/login-page';
import { NotFoundPage } from '@/pages/not-found-page';
import { ProfilePage } from '@/pages/profile-page';
import { ReleaseDetailsPage } from '@/pages/release-details-page';
import { PendingReviewPage } from '@/pages/pending-review-page';
import { SignupPage } from '@/pages/signup-page';
import { SubscriptionPage } from '@/pages/subscription-page';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export default function App() {
  return (
    <QueryProvider>
      <Router>
        <Routes>
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/auth" element={<AuthLandingPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            {/* Purchase / renew (not while request is pending review) */}
            <Route element={<PanelLayout />}>
              <Route element={<SubscriptionPageRoute />}>
                <Route path="/subscription" element={<SubscriptionPage />} />
              </Route>
              <Route element={<PendingReviewRoute />}>
                <Route path="/pending-review" element={<PendingReviewPage />} />
              </Route>
            </Route>

            <Route element={<ActiveSubscriptionRoute />}>
              <Route element={<PanelLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/courses/:id" element={<CourseDetailsPage />} />
                <Route path="/hawssa-releases" element={<HawssaReleasesPage />} />
                <Route path="/hawssa-releases/:slug" element={<ReleaseDetailsPage />} />
              </Route>
              {/* Authed + active subscription only; otherwise ActiveSubscriptionRoute → /subscription */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </QueryProvider>
  );
}
