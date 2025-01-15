import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from './../../LoadingSpinner';
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";

const img_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const UpdateProduct = () => {
  const { id } = useParams();
  
  const axiosPublic = useAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const { register, handleSubmit,  reset } = useForm();

  useEffect(() => {
    // Fetch the product data by ID
    axiosSecure
      .get(`/product/${id}`)
      .then((response) => {
        const product = response.data;
        console.log(product);
        
        setInitialData(product);
        setTags(product.tags.map((tag) => ({ id: tag, text: tag })));
        reset(product);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        toast.error("Failed to load product data.");
      });
  }, [id, axiosSecure, reset]);

  const onSubmit = (data) => {
    const updatedProduct = {
      productName: data.productName,
      description: data.description,
      link: data.link,
      tags: tags.map((tag) => tag.text),
    };

    // Handle image upload if a new image is provided
    if (data.image && data.image.length > 0) {
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
            updatedProduct.productImage = res.data.data.display_url;
            return updateProduct(updatedProduct);
          } else {
            toast.error("Image upload failed.");
          }
        })
       
    } else {
      updateProduct(updatedProduct);
    }
  };

  const updateProduct = (productData) => {
    axiosSecure
      .patch(`/product/${id}`, productData)
      .then((response) => {
        toast.success("Product updated successfully!");
        navigate("/dashboard/my-products");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        toast.error("Failed to update product.");
      });
  };

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

  if (!initialData) return <LoadingSpinner/>

  return (
    <div>
      <h2 className="md:text-4xl text-xl font-bold text-[#8D0B41] mb-8 text-center">
        Update Product
      </h2>
      <div className="bg-gray-50 p-8 rounded-xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="label">
            <span className="label-text text-xl font-bold text-[#8D0B41]">
              Product Info:
            </span>
          </div>
          <div className="flex gap-6">
            <label className="form-control w-1/2">
              <div className="label">
                <span  className="label-text">Product Name*</span>
              </div>
              <input
                {...register("productName", { required: true })}
                type="text"
                className="input input-bordered"
                
              />
            </label>
            <label className="form-control w-1/2">
              <div className="label">
                <span className="label-text">Product Image</span>
              </div>
              <input
                {...register("image")}
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
            ></textarea>
          </label>

          <label className="form-control">
            <div className="label">
              <span className="label-text">Website Link*</span>
            </div>
            <input
              {...register("link", { required: true })}
              type="text"
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

          <button
            type="submit"
            className="btn mt-5 hover:bg-[#D39D55] bg-[#8D0B41] text-white"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
