import { useForm } from "react-hook-form";

import { WithContext as ReactTags } from "react-tag-input";
import { useState } from "react";

import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet-async";

const img_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const AddProducts = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = UseAxiosSecure();
const navigate=useNavigate()
  const [tags, setTags] = useState([]);
  const { register, handleSubmit,reset } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
  
    axiosPublic
      .post(img_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          const productInfo = {
            productName: data.productName,
            ownerImage: user?.photoURL,
            productImage: res.data.data.display_url,
            ownerName: user?.displayName,
            ownerEmail: user?.email,
            tags: tags.map((tag) => tag.text),
            description: data.description,
            link: data.link,
            upvoteCount: 0,
            downvoteCount: 0,
            status: "Pending",
            isRejected: false,
            isAccepted: false,
            isFeatured: false,
          };
  
          return axiosSecure.post("/product", productInfo);
        } else {
          toast.error("Failed to upload image.");
        }
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("Product added successfully!");
          reset();
          setTags([]);
          navigate('/dashboard/my-products');
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong. Please try again.");
      });
  };
  

  // Handlers for react-tag-input
  const handleDelete = (i) => {
    setTags(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags];
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };

  return (
    <div className="container mx-auto px-4 md:px-8 mb-6 md:mb-8">
        <Helmet>
        <title> TechDiscoverly | Dashboard | Add Products</title>
      </Helmet>
  <SectionTitle heading="Add Product" />
  <div className="bg-gray-50 p-6 md:p-8 rounded-xl shadow-lg">
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Product Info */}
      <div className="md:mb-6 mb-2">
        <span className="block md:text-xl font-bold text-[#8D0B41]">
          Product Info:
        </span>
      </div>

      <div className="md:flex  gap-6">
        <label className="form-control w-full md:w-1/2">
          <span className="label-text block mb-2">Product Name*</span>
          <input
            {...register("productName", { required: true })}
            type="text"
            placeholder="Product Name"
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full md:w-1/3">
          <span className="label-text block mb-2">Product Image*</span>
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full"
          />
        </label>
      </div>

      <label className="form-control w-full mb-6">
        <span className="label-text block my-2">Description*</span>
        <textarea
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full h-24"
          placeholder="Product Details"
        ></textarea>
      </label>

      <label className="form-control w-full mb-6">
        <span className="label-text block mb-2">Website Link*</span>
        <input
          {...register("link", { required: true })}
          type="text"
          placeholder="Website Link"
          className="input input-bordered w-full"
        />
      </label>

      <label className="form-control w-full mb-6">
        <span className="label-text block mb-2">Tags*</span>
        <ReactTags
          tags={tags}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          placeholder="Add a tag and click enter"
          inputFieldPosition="top"
          autocomplete
          className="w-full"
        />
      </label>

      {/* Product Owner Info */}
      <div className="md:mb-6 mb-2">
        <span className="block md:text-xl font-bold text-[#8D0B41]">
          Product Owner Info:
        </span>
      </div>

      <div className="md:flex  gap-6">
        <label className="form-control w-full md:w-1/2">
          <span className="label-text block mb-2">Owner Name</span>
          <input
            {...register("ownerName")}
            defaultValue={user?.displayName}
            readOnly
            className="input input-bordered w-full"
          />
        </label>

        <label className="form-control w-full md:w-1/2">
          <span className="label-text block mb-2">Owner Email</span>
          <input
            {...register("ownerEmail")}
            defaultValue={user?.email}
            readOnly
            className="input input-bordered w-full"
          />
        </label>
      </div>

      <label className="form-control w-full mt-6 ">
        <span className="label-text block mb-2">Owner Image</span>
        <img className="w-20 h-20 rounded-full " src={user?.photoURL} alt="Owner" />
      </label>

      <button
        type="submit"
        className="btn w-full md:w-auto mt-5 bg-[#8D0B41] hover:bg-[#D39D55] text-white mx-auto"
      >
        Submit
      </button>
    </form>
  </div>
</div>

  );
};

export default AddProducts;
