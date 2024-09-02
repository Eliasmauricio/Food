import React, { useState } from "react";
import deliveryImage from "./img/delivery.jpg"; // Imagem do entregador
import pizzaImage from "./img/pizza.jpg"; // Exemplo de imagem de pizza
import sushiImage from "./img/sushi.jpg"; // Exemplo de imagem de sushi
import burgerImage from "./img/burger.jpg"; // Exemplo de imagem de hambúrguer
import sorveteImage from "./img/sorvete.jpg"; // Exemplo de imagem de sorvete
import saladaImage from "./img/salada.jpg"; // Exemplo de imagem de salada
import pastaImage from "./img/pasta.jpg"; // Exemplo de imagem de pasta

const dishes = [
  { name: "Pizza", price: 25.00, image: pizzaImage },
  { name: "Sushi", price: 40.00, image: sushiImage },
  { name: "Hambúrguer", price: 15.00, image: burgerImage },
  { name: "Sorvete", price: 10.00, image: sorveteImage },
  { name: "Salada", price: 18.00, image: saladaImage },
  { name: "Pasta", price: 22.00, image: pastaImage },
];

function Home() {
  const [quantities, setQuantities] = useState(dishes.map(() => 0));
  const [totalPrice, setTotalPrice] = useState(0);
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);

  const increaseQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
    setTotalPrice(totalPrice + dishes[index].price);
  };

  const decreaseQuantity = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index]--;
      setQuantities(newQuantities);
      setTotalPrice(totalPrice - dishes[index].price);
    }
  };

  const confirmPurchase = () => {
    setPurchaseConfirmed(true);
    setQuantities(dishes.map(() => 0)); // Reseta as quantidades
    setTotalPrice(0); // Reseta o valor total
  };

  return (
    <div>
      <header>
        <h1>FOOD</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>Contato</li>
            <li>Login</li>
          </ul>
        </nav>
      </header>

      <div className="delivery-section">
        <img src={deliveryImage} alt="Entregador" className="delivery-image" />
        <div className="delivery-text">
          <h2>Nós fornecemos entrega em 30 minutos</h2>
          <input type="text" placeholder="Digite seu CEP" />
          <button className="discover-button">Descobrir</button>
        </div>
      </div>

      <section className="dishes-section">
        {!purchaseConfirmed ? (
          dishes.map((dish, index) => (
            <div key={index} className="dish-card">
              <img src={dish.image} alt={dish.name} className="dish-image" />
              <h3>{dish.name}</h3>
              <p>Preço: R$ {dish.price.toFixed(2)}</p>
              <div className="quantity-control">
                <button onClick={() => decreaseQuantity(index)}>-</button>
                <span>{quantities[index]}</span>
                <button onClick={() => increaseQuantity(index)}>+</button>
              </div>
            </div>
          ))
        ) : (
          <h2 className="confirmation-message">Compra Confirmada! Obrigado!</h2>
        )}
      </section>

      {!purchaseConfirmed && (
        <footer>
          <h2>Total: R$ {totalPrice.toFixed(2)}</h2>
          <button className="confirm-button" onClick={confirmPurchase}>Confirmar Compra</button>
        </footer>
      )}
    </div>
  );
}

export default Home;