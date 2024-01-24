import AdvanceStepButton from '@/components/ui/AdvanceStepButton'
import Title from '@/components/ui/Title'
import CodeBox from '@/components/ui/CodeBox';
import Link from 'next/link';

export default async function Home() {
  let compiledCircuit;
  try {
    compiledCircuit = require("../../axiom/data/compiled.json");
  } catch (e) {
    console.log(e);
  }
  if (compiledCircuit === undefined) {
    return (
      <>
        <div>
          Compile circuit first by running in the root directory of this project:
        </div>
        <CodeBox>
          {"npx axiom compile circuit app/axiom/swapEvent.circuit.ts"}
        </CodeBox>
      </>
    )
  }

  return (
    <>
      <Title>
        Autonomous Airdrop Example
      </Title>
      <div className="text-center">
        Anyone who joined later than 250 blocks ago is eligible for an airdrop of a useless test ERC20 token.
      </div>
      <AdvanceStepButton
        label="Generate Proof"
        href={"/check"}
      />
    </>
  )
}