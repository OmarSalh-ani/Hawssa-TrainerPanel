import { ClipboardList, Mail, ShieldCheck } from 'lucide-react';

export function PendingReviewPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-500/15">
            <ShieldCheck className="h-8 w-8 text-yellow-600" aria-hidden />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Request under review</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for submitting your subscription and payment proof. Our team is reviewing your
            request. You will get access to the full panel as soon as your subscription is verified.
          </p>

          <ul className="text-left space-y-4 mb-8">
            <li className="flex gap-3">
              <ClipboardList className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-medium text-gray-900">Processing</p>
                <p className="text-sm text-gray-600">
                  We validate your plan and payment details. This usually takes a short time.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-medium text-gray-900">Stay tuned</p>
                <p className="text-sm text-gray-600">
                  If we need anything else, we will reach out using your account email.
                </p>
              </div>
            </li>
          </ul>

          <p className="text-xs text-gray-500">
            You can sign out from the header when you are done. This page will update automatically once
            your subscription is approved.
          </p>
        </div>
      </div>
    </div>
  );
}
