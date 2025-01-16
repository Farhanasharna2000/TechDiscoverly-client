
const SectionTitle = ({heading,subHeading}) => {
    return (
        <div className="md:w-4/12 mx-auto text-center my-8">
          <p className="text-[#D99904] mb-2">--- {subHeading} ---</p> 
          <h3 className="md:text-3xl uppercase border-y-2 py-3">{heading}</h3> 
        </div>
    );
};

export default SectionTitle;