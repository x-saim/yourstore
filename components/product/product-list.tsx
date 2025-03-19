
const ProductList = (
  { data,
    title,
    limit
  }:
    {
      data: any;
      title?: string,
      limit?: number
    }) => {

  // If limit is provided, limit the data to the number of items specified by limit
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <>
      <div className="my-10">
        <h2 className="h2-bold mb-4">{title}</h2>
        {limitedData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {limitedData.map((product: any) => (
              <>{product.name}</>
            ))}
          </div>
        ) : (
          <div>
            <p>No product found</p>
          </div>
        )
        }
      </div>
    </>
  );
};

export default ProductList;

