const React = import("react");

interface Props {
  isLoading: boolean;
}

const Loader = ({ isLoading }: Props) => {
  return <div>loading</div>;
};

export default Loader;
