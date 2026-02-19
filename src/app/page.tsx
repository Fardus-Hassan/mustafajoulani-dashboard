import MetricCard from "@/components/MetricCard";

function UsersIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function SubscribersIcon() {
  return (
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5646 4.40578C19.6629 1.30745 24.6863 1.30745 27.7846 4.40578L35.5929 12.2141C38.6913 15.3124 38.6913 20.3358 35.5929 23.4341L23.6113 35.4158H33.3329C34.0229 35.4158 34.5829 35.9758 34.5829 36.6658C34.5829 37.3558 34.0229 37.9158 33.3329 37.9158H6.66627C5.97627 37.9158 5.41627 37.3558 5.41627 36.6658C5.41627 35.9758 5.97627 35.4158 6.66627 35.4158H12.0379L4.40627 27.7841C1.30794 24.6858 1.30794 19.6624 4.40627 16.5641L16.5646 4.40578ZM13.9813 33.8241C16.1046 35.9458 19.5446 35.9458 21.6663 33.8241L33.8246 21.6658C35.9463 19.5441 35.9463 16.1041 33.8246 13.9808L27.0896 7.24578L7.24627 27.0891L13.9813 33.8241ZM18.3329 6.17411L6.1746 18.3324C4.2896 20.2158 4.0796 23.1408 5.54127 25.2591L25.2596 5.54078C23.1413 4.07911 20.2163 4.28911 18.3329 6.17411ZM31.9363 17.5391C32.4246 18.0274 32.4246 18.8191 31.9363 19.3074L28.2696 22.9725C27.7829 23.4608 26.9913 23.4608 26.5029 22.9725C26.0146 22.4841 26.0146 21.6924 26.5029 21.2041L30.1679 17.5391C30.6563 17.0508 31.4479 17.0508 31.9363 17.5391ZM25.1413 24.2958C25.6296 24.7841 25.6296 25.5758 25.1413 26.0641L23.5096 27.6941C23.0229 28.1824 22.2313 28.1824 21.7429 27.6941C21.2546 27.2058 21.2546 26.4158 21.7429 25.9274L23.3746 24.2958C23.8629 23.8074 24.6529 23.8074 25.1413 24.2958Z" fill="#3E8DB9"/>
</svg>

  );
}

function RevenueIcon() {
  return (
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.08337 14.9997C7.08337 7.86634 12.8667 2.08301 20 2.08301C27.1334 2.08301 32.9167 7.86634 32.9167 14.9997C32.9167 21.7113 27.7967 27.228 21.25 27.8563V29.753C22.2017 29.1997 23.4517 28.7497 25 28.7497C28.9567 28.7497 30.9567 31.6813 31.04 31.8063C31.32 32.2263 31.32 32.773 31.04 33.193C30.9567 33.318 28.9567 36.2497 25 36.2497C23.4517 36.2497 22.2017 35.7997 21.25 35.2463V36.6664C21.25 37.3563 20.69 37.9164 20 37.9164C19.31 37.9164 18.75 37.3563 18.75 36.6664V35.2463C17.7984 35.7997 16.5484 36.2497 15 36.2497C11.0434 36.2497 9.04337 33.318 8.96004 33.193C8.68004 32.773 8.68004 32.2263 8.96004 31.8063C9.04337 31.6813 11.0434 28.7497 15 28.7497C16.5484 28.7497 17.7984 29.1997 18.75 29.753V27.8563C12.2034 27.228 7.08337 21.7113 7.08337 14.9997ZM20 4.58301C14.2467 4.58301 9.58337 9.24634 9.58337 14.9997C9.58337 20.753 14.2467 25.4163 20 25.4163C25.7534 25.4163 30.4167 20.753 30.4167 14.9997C30.4167 9.24634 25.7534 4.58301 20 4.58301ZM21.25 8.33301V9.30468H22.6034C24.2317 9.30468 25.4167 10.688 25.4167 12.2213V13.333C25.4167 13.9363 25.2334 14.518 24.91 14.9997C25.2334 15.4813 25.4167 16.063 25.4167 16.6663V17.778C25.4167 19.3113 24.2317 20.6947 22.6034 20.6947H21.25V21.6663C21.25 22.3563 20.69 22.9163 20 22.9163C19.31 22.9163 18.75 22.3563 18.75 21.6663V20.6947H15.8334C15.1434 20.6947 14.5834 20.1347 14.5834 19.4447C14.5834 18.753 15.1434 18.1947 15.8334 18.1947H16.1467V11.8047H15.8334C15.1434 11.8047 14.5834 11.2463 14.5834 10.5547C14.5834 9.86468 15.1434 9.30468 15.8334 9.30468H18.75V8.33301C18.75 7.64301 19.31 7.08301 20 7.08301C20.69 7.08301 21.25 7.64301 21.25 8.33301ZM15 33.7497C16.5734 33.7497 17.6767 33.0597 18.315 32.4997C17.6784 31.9413 16.5734 31.2497 15 31.2497C13.4267 31.2497 12.3234 31.9397 11.685 32.4997C12.3217 33.058 13.4267 33.7497 15 33.7497ZM21.685 32.4997C22.3217 33.058 23.4267 33.7497 25 33.7497C26.5734 33.7497 27.6767 33.0597 28.315 32.4997C27.6784 31.9413 26.5734 31.2497 25 31.2497C23.4267 31.2497 22.3234 31.9397 21.685 32.4997ZM18.6467 16.2497V18.1947H22.6034C22.7017 18.1947 22.9167 18.0847 22.9167 17.778V16.6663C22.9167 16.3597 22.7017 16.2497 22.6034 16.2497H18.6467ZM18.6467 13.7497H22.6034C22.7017 13.7497 22.9167 13.6397 22.9167 13.333V12.2213C22.9167 11.9147 22.7017 11.8047 22.6034 11.8047H18.6467V13.7497Z" fill="#3E8DB9"/>
</svg>

  );
}

const subscriptionPlans = [
  { planName: "Free", users: "721", price: "$0", totalRevenue: "$0" },
  { planName: "Base", users: "1,234", price: "$9.99", totalRevenue: "$12,327.66" },
  { planName: "Premium", users: "892", price: "$39.99", totalRevenue: "$35,671.08" },
];

const users = [
  { name: "Sarah Johnson", email: "sarah.j@email.com", plan: "Premium" as const, status: "Active" as const, nextBilling: "2026-02-15" },
  { name: "Michael Chen", email: "mchen@email.com", plan: "Base" as const, status: "Active" as const, nextBilling: "2026-02-10" },
  { name: "Emma Williams", email: "emma.w@email.com", plan: "Premium" as const, status: "Active" as const, nextBilling: "2026-02-18" },
  { name: "James Brown", email: "jbrown@email.com", plan: "Base" as const, status: "Paused" as const, nextBilling: "2026-03-01" },
  { name: "Olivia Davis", email: "olivia.d@email.com", plan: "Free" as const, status: "Active" as const, nextBilling: "-" },
  { name: "William Martinez", email: "w.martinez@email.com", plan: "Premium" as const, status: "Active" as const, nextBilling: "2026-02-20" },
  { name: "Sophia Garcia", email: "sophia.g@email.com", plan: "Base" as const, status: "Active" as const, nextBilling: "2026-02-12" },
  { name: "Liam Anderson", email: "liam.a@email.com", plan: "Free" as const, status: "Active" as const, nextBilling: "-" },
];

function PlanBadge({ plan }: { plan: string }) {
  if (plan === "Premium")
    return <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-800">Premium</span>;
  if (plan === "Base")
    return <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">Base</span>;
  return <span className="text-base text-gray-700 px-3 py-1 bg-[#F3F4F6] rounded-full">Free</span>;
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Active")
    return <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">Active</span>;
  if (status === "Paused")
    return <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">Paused</span>;
  return <span className="text-base text-gray-600 md:text-lg">{status}</span>;
}

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 lg:p-10">
      <header className="mb-8 md:mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Dashboard</h1>
        <p className="mt-2 text-base text-gray-500 md:text-lg">Manage subscriptions and monitor key metrics</p>
      </header>

      <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mb-10 lg:gap-6">
        <MetricCard title="Total Active Users" value="2,847" icon={<UsersIcon />} />
        <MetricCard title="Total Subscribers" value="1,500" icon={<SubscribersIcon />} />
        <MetricCard title="Total Revenue" value="$47,820" icon={<RevenueIcon />} />
      </section>

      <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:mb-10 md:p-8">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">Subscription Plans</h2>
        <p className="mt-1.5 text-base text-gray-500 md:text-lg">Overview of plan performance and revenue</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[400px] text-left text-base">
            <thead>
              <tr className="border-b-2 border-gray-200 text-gray-600">
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">Plan Name</th>
                <th className="pb-4 pt-1 text-right text-base font-semibold md:text-lg">Users</th>
                <th className="pb-4 pt-1 text-right text-base font-semibold md:text-lg">Price</th>
                <th className="pb-4 pt-1 text-right text-base font-semibold md:text-lg">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {subscriptionPlans.map((row) => (
                <tr key={row.planName} className="border-b border-gray-100">
                  <td className="py-4 text-base font-medium text-gray-900 md:text-lg">{row.planName}</td>
                  <td className="py-4 text-right text-base text-gray-700 md:text-lg">{row.users}</td>
                  <td className="py-4 text-right text-base text-gray-700 md:text-lg">{row.price}</td>
                  <td className="py-4 text-right text-base text-gray-700 md:text-lg">{row.totalRevenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-gray-900 md:text-2xl">User Management</h2>
        <p className="mt-1.5 text-base text-gray-500 md:text-lg">Manage user subscriptions and status</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-base">
            <thead>
              <tr className="border-b-2 border-gray-200 text-gray-600">
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">User</th>
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">Email</th>
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">Plan</th>
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">Status</th>
                <th className="pb-4 pt-1 text-base font-semibold md:text-lg">Next Billing</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email} className="border-b border-gray-100">
                  <td className="py-4 text-base font-medium text-gray-900 md:text-lg">{user.name}</td>
                  <td className="py-4 text-base text-gray-600 md:text-lg">{user.email}</td>
                  <td className="py-4"><PlanBadge plan={user.plan} /></td>
                  <td className="py-4"><StatusBadge status={user.status} /></td>
                  <td className="py-4 text-base text-gray-600 md:text-lg">{user.nextBilling}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
