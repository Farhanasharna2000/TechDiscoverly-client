import { useState } from "react";
import Swal from "sweetalert2";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const NewsLetter = () => {
    const [email, setEmail] = useState("");

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubscribe = () => {
        if (isValidEmail(email)) {
            Swal.fire({
                title: "Thank you for subscribing!",
                icon: "success",
                draggable: true
              });
            setEmail("");
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a valid email!",
              });
              setEmail("");
        }
    };

    return (
        <div className="md:pb-16 md:pt-6 border-y-[1px]">
             <SectionTitle

heading="Subscribe for Product Updates"
/>
<div className="text-center">

            <input
                type="email"
                placeholder="Enter your email"
                className=" p-2 border rounded w-64"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe} className="ml-2 my-4 md:my-0 bg-[#8D0B41] text-white hover:bg-[#D39D55] px-6 py-2 rounded ">
                Subscribe
            </button>
</div>
        </div>
    );
};

export default NewsLetter;
