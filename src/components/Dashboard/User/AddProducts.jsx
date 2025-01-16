import { useForm } from "react-hook-form";

import { WithContext as ReactTags } from "react-tag-input";
import { useState } from "react";

import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

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
            status: "pending",
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
    <div>
      <h2 className="md:text-4xl text-xl font-bold text-[#8D0B41] mb-8 text-center">Add Product</h2>
      <div className="bg-gray-50 p-8 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="label">
            <span className="label-text text-xl font-bold text-[#8D0B41]">Product Info:</span>
          </div>
          <div className="flex gap-6">
            <label className="form-control w-1/2">
              <div className="label">
                <span className="label-text">Product Name*</span>
              </div>
              <input
                {...register("productName", { required: true })}
                type="text"
                placeholder="Product Name"
                className="input input-bordered"
              />
            </label>
            <label className="form-control w-1/2">
              <div className="label">
                <span className="label-text">Product Image*</span>
              </div>
              <input
                {...register("image", { required: true })}
                type="file"
                className="file-input w-full max-w-xs"
              />
            </label>
          </div>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Description*</span>
            </div>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Product Details"
            ></textarea>
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Website Link*</span>
            </div>
            <input
              {...register("link", { required: true })}
              type="text"
              placeholder="Website Link"
              className="input input-bordered"
            />
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Tags*</span>
            </div>
            <ReactTags
              tags={tags}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              placeholder="Add a tag and click enter"
              inputFieldPosition="top"
              autocomplete
              
            />
          </label>

          <div className="label">
            <span className="label-text text-xl font-bold text-[#8D0B41]">Product Owner Info:</span>
          </div>
          <div className="flex gap-6">
            <label className="form-control w-1/2">
              <div className="label">
                <span className="label-text">Owner Name</span>
              </div>
              <input
                {...register("ownerName")}
                defaultValue={user?.displayName}
                readOnly
                className="input input-bordered"
              />
            </label>
            <label className="form-control w-1/2">
              <div className="label">
                <span className="label-text">Owner Email</span>
              </div>
              <input
                {...register("ownerEmail")}
                defaultValue={user?.email}
                readOnly
                className="input input-bordered"
              />
            </label>
          </div>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Owner Image</span>
            </div>
            <img className="w-20" src={user?.photoURL} alt="Owner" />
          </label>

          <button type="submit" className="btn mt-5 hover:bg-[#D39D55] bg-[#8D0B41] text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
