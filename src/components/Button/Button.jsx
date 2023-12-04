export const Button = ({ loadMoreBtn }) => {
  return (
    <>
      <button className="Button" onClick={() => loadMoreBtn()} type="button">
        Loader...
      </button>
    </>
  );
};
