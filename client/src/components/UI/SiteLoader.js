
import { FidgetSpinner } from  'react-loader-spinner'

export const LoaderComponent = () => {
  return (
    <>
      <FidgetSpinner
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={['#ff0000', '#00ff00', '#0000ff']}
        backgroundColor="#F4442E"
      />
    </>
  );
};