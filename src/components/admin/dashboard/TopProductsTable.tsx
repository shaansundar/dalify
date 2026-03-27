export interface TopProduct {
  readonly name: string;
  readonly units: number;
  readonly revenue: number;
}

interface TopProductsTableProps {
  readonly products: ReadonlyArray<TopProduct>;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function TopProductsTable({ products }: TopProductsTableProps) {
  return (
    <div className="rounded-lg border border-cream-dark bg-warm-white p-5">
      <h3 className="font-heading text-lg font-semibold text-charcoal">
        Top Products
      </h3>
      {products.length === 0 ? (
        <p className="mt-4 text-center text-sm text-charcoal-muted">
          No product data available.
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-cream-dark">
                <th className="pb-2 text-left font-medium text-charcoal-muted">
                  #
                </th>
                <th className="pb-2 text-left font-medium text-charcoal-muted">
                  Product
                </th>
                <th className="pb-2 text-right font-medium text-charcoal-muted">
                  Units
                </th>
                <th className="pb-2 text-right font-medium text-charcoal-muted">
                  Revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr
                  key={product.name}
                  className="border-b border-cream-dark last:border-0"
                >
                  <td className="py-2.5 text-charcoal-muted">{index + 1}</td>
                  <td className="py-2.5 font-medium text-charcoal">
                    {product.name}
                  </td>
                  <td className="py-2.5 text-right text-charcoal">
                    {product.units.toLocaleString("en-IN")}
                  </td>
                  <td className="py-2.5 text-right text-charcoal">
                    {formatCurrency(product.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
