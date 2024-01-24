import CheckAge from "@/components/check/CheckAge";
import Title from "@/components/ui/Title";

export default async function Check() {
  return (
    <>
      <Title>
        Check eligibility
      </Title>
      <CheckAge />
    </>
  )
}
