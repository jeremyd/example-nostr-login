import ServerStatus from "./ServerStatus"

export default function PaymentPage(props: { params: Record<string, string> }) {

  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <ServerStatus />
    </div>
  )

}