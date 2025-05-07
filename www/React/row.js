function TableRow({product}) {
    const [cantidad, setCantidad] = React.useState(product.quantity);
    const [subtotal, setSubtotal] = React.useState(product.quantity * product.price);

    const subTotal = (event) => {
        setCantidad(event.target.value);
        setSubtotal(event.target.value * product.price);
    }

    return <tr key={product.id}>
        <td>{product.name}</td>
        <td>Q{product.price}</td>
        <td>
            <input type="number" value={cantidad} onChange={subTotal} />
        </td>
        <td>Q{subtotal}</td>
    </tr>
}