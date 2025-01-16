import { useForm } from "react-hook-form";
import { WithContext as ReactTags } from "react-tag-input";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "./../../LoadingSpinner";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const img_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const UpdateProduct = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    axiosSecure
      .get(`/product/${id}`)
      .then((response) => {
        const product = response.data;
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
        });
    } else {
      updateProduct(updatedProduct);
    }
  };

  const updateProduct = (productData) => {
    axiosSecure
      .patch(`/product/${id}`, productData)
      .then(() => {
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

  if (!initialData) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 mb-6 md:mb-8 md:px-8">
  <SectionTitle heading="Update Product" />
  <div className="bg-gray-50 p-4 md:p-8 rounded-xl shadow-lg">
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label className="block text-xl font-bold text-[#8D0B41]">
          Product Info:
        </label>
      </div>

      <div className="md:flex md:flex-wrap gap-4">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <label className="block mb-2">Product Name*</label>
          <input
            {...register("productName", { required: true })}
            type="text"
            className="input input-bordered w-full"
          />
        </div>

        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <label className="block mb-2">Product Image</label>
          <input
            {...register("image")}
            type="file"
            className="file-input w-full"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Description*</label>
        <textarea
          {...register("description", { required: true })}
          className="textarea textarea-bordered w-full h-24"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Website Link*</label>
        <input
          {...register("link", { required: true })}
          type="text"
          className="input input-bordered w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Tags*</label>
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
      </div>

      <button
        type="submit"
        className="btn w-full md:w-auto mt-5 bg-[#8D0B41] hover:bg-[#D39D55] text-white"
      >
        Update
      </button>
    </form>
  </div>
</div>

  );
};

export default UpdateProduct;
