import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";

import { WithContext as ReactTags } from "react-tag-input";
import { useState } from "react";

const AddProducts = () => {
    const { user } = useAuth()
    const [tags, setTags] = useState([]);
    const {
        register,
        handleSubmit,

    } = useForm()

    const onSubmit = (data) => console.log(data)
    // Handlers for react-tag-input
    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
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
                        <span className="label-text text-xl font-bold text-[#8D0B41]">Product Info : </span>

                    </div>
                    <div className="flex gap-6">

                        <label className="form-control w-1/2">
                            <div className="label">
                                <span className="label-text">Product Name*</span>
                            </div>
                            <input
                                {...register("name", { required: true })}
                                type="text" placeholder="Recipe Name" className="input input-bordered  " />

                        </label>
                        <label className="form-control w-1/2">
                            <div className="label">
                                <span className="label-text">Product Image*</span>

                            </div>

                            <input
                                {...register("image", { required: true })}
                                type="file" className="file-input w-full max-w-xs" />


                        </label>
                    </div>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Description*</span>

                        </div>
                        <textarea  {...register("recipe", { required: true })}

                            className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>

                    </label>

                    <label className="form-control ">
                        <div className="label">
                            <span className="label-text">Website Link*</span>
                        </div>
                        <input
                            {...register("link", { required: true })}
                            type="text" placeholder="Website Link" className="input input-bordered  " />

                    </label>
                    <label className="form-control ">
                        <div className="label">
                            <span className="label-text">Tags*</span>
                        </div>
                        <div>
                            <ReactTags
                                tags={tags}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                handleDrag={handleDrag}
                                placeholder="Add a tag"
                                inputFieldPosition="top"
                                autocomplete
                                classNames={{
                                    input: 'react-tags-input-field '
                                }}
                            />

                        </div>


                    </label>

                    <div className="label">
                        <span className="label-text text-xl font-bold text-[#8D0B41]">Product Owner Info : </span>

                    </div>
                    <div className="flex gap-6">
                        <label className="form-control w-1/2">
                            <div className="label">
                                <span className="label-text">Owner Name</span>

                            </div>
                            <input
                                {...register("ownerName", { required: true })}
                                placeholder={user?.displayName} readOnly className="input input-bordered  " />

                        </label>
                        <label className="form-control w-1/2">
                            <div className="label">
                                <span className="label-text">Owner Email</span>

                            </div>
                            <input
                                {...register("ownerEmail", { required: true })}
                                placeholder={user?.email} readOnly className="input input-bordered  " />

                        </label>
                    </div>

                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Owner Image</span>

                        </div>
                        <img className="w-20" src={user?.photoURL} alt="" />

                    </label>


                    <button className="btn mt-5 hover:bg-[#D39D55] bg-[#8D0B41] text-white ">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProducts;