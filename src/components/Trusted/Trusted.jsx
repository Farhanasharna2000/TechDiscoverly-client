import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const companies = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png" },
  { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "PayPal", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  { name: "eBay", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg" },
  { name: "SAP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },

];

const Trusted = () => {
  return (
    <div className="md:pb-16 pb-8 md:pt-8">
           <SectionTitle

heading="Trusted by Leading Brands"
/>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {companies.map((company, index) => (
          <img
            key={index}
            src={company.logo}
            alt={company.name}
            className="md:h-10 h-4 opacity-70 hover:opacity-100 transition-opacity duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default Trusted;
