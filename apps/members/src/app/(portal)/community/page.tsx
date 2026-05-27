import { SectionCard } from "@/components/section-card";
import { discordChannels } from "@/lib/demo-data";

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">
          Community & Discord
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Discord stays the live community layer.
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-600">
          The member app should point people to the right channel while keeping
          account, billing, and access-status issues in official support flows.
        </p>
      </div>

      <SectionCard title="Channel Guide" eyebrow="Where to go">
        <div className="overflow-hidden rounded-md border border-neutral-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-neutral-100 text-neutral-700">
              <tr>
                <th className="px-4 py-3 font-semibold">Need</th>
                <th className="px-4 py-3 font-semibold">Destination</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {discordChannels.map(([need, destination]) => (
                <tr key={need}>
                  <td className="px-4 py-3 text-neutral-700">{need}</td>
                  <td className="px-4 py-3 font-semibold text-neutral-950">{destination}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
