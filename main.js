import "./css/bootstrap.min.css";
import "./js/bootstrap.bundle.min";

const RAPID_KEY = import.meta.env.VITE_RAPID_KEY;
const RAPID_HOST = import.meta.env.VITE_RAPID_HOST;

const fetchAmazonDeals = async (query, page = 1) => {
  document.querySelector(".spinner-border").classList.remove("d-none");

  const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${query}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "d8faf24648mshd3785e12f587c32p1333dbjsn35f9c3118b79",
      "x-rapidapi-host": "real-time-amazon-data.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    //console.log(result.data.products);
    const products = result.data.products;
    handleAmazonDeals(products);
  } catch (error) {
    console.error(error);
  }
};

const handleAmazonDeals = (data) => {
  console.log(data);

  const dynamicDataDiv = document.querySelector(".dynamic_data");
  dynamicDataDiv.innerHTML = "";

  // if (dealsList.length === 0) {
  // dynamicDataDiv.innerHTML = "<p>No deals found.</p>";
  //  return;
  //  }

  data.forEach((deal) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card", "h-100");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = deal.product_title;

    const price = document.createElement("p");
    price.classList.add("card-text");
    price.textContent = `Price: ${deal.product_original_price}`;

    const link = document.createElement("a");
    link.href = deal.link;
    link.textContent = "View Deal";
    link.target = "_blank";
    link.classList.add("btn", "btn-primary");

    cardBody.appendChild(title);
    cardBody.appendChild(price);
    cardBody.appendChild(link);
    cardDiv.appendChild(cardBody);
    colDiv.appendChild(cardDiv);

    dynamicDataDiv.appendChild(colDiv);
  });
};

document.getElementById("searchButton").addEventListener("click", () => {
  const search_btn = document.getElementById("searchInput").value.trim();
  if (search_btn) {
    fetchAmazonDeals(search_btn);
  } else {
    alert("Please enter a search term.");
  }
});
