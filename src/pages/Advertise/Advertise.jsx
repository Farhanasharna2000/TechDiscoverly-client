const Advertise = () => {
    const people = [
        { id: 1, img: "https://thumbs.dreamstime.com/b/young-blonde-girl-beautiful-blue-eyes-wearing-black-jacket-close-up-portrait-outdoors-pretty-russian-female-long-wavy-87720680.jpg",  position: "top-0 left-12" },
        { id: 2, img: "https://randomuser.me/api/portraits/men/2.jpg",  position: "top-16 right-0" },
        { id: 3, img: "https://randomuser.me/api/portraits/men/3.jpg",  position: "top-32 left-0" },
        { id: 4,  img: "https://randomuser.me/api/portraits/men/5.jpg",  position: "top-48 right-12" },
        { id: 5, img: "https://randomuser.me/api/portraits/women/1.jpg",  position: "top-24 left-1/2 transform -translate-x-1/2" },
    ];
    const stats = [
        { title: "800k", description: "Newsletter subscribers" },
        { title: "Millions", description: "Monthly pageviews" },
        { title: "Top roles", description: "Admin, Moderator, User" },
      ];
      const options = [
        {
          title: "Newsletters",
          description:
            "Maximize awareness by sponsoring content in our industry-leading daily tech roundup that's read by more than 500K subscribers or one of our targeted, interest-based newsletters.",
        },
        {
          title: "Promoted discussions and AMA",
          description:
            "Work with us to position and feature a promoted discussion or AMA to drive awareness and conversation about a chosen topic.",
        },
        {
          title: "Community events",
          description:
            "Partner with us to build out, promote, host, and distribute digital event content that will resonate with the Product Hunt community to drive awareness, engagement, and leads.",
        },
      ];
    return (
        <div className="container mx-auto md:px-4 md:pt-28 pt-4 mb-5 md:mb-10">
            <div className="container mx-auto flex flex-col md:flex-row items-center mb-8">
                {/* Left Content */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="md:text-4xl text-xl font-extrabold text-[#8D0B41] ">
                        Reach millions of <br /> early adopters
                    </h2>
                    <p className=" md:mt-4">
                        Our advertising options will help you build traction with the most influential
                        early adopters on the web.
                    </p>
                </div>

                {/* Right Circular Floating Images */}
                <div className="md:w-1/2 flex justify-center relative mt-8 md:mt-0">
                    <div className="w-64 h-64 relative">
                        {people.map((person) => (
                            <div
                                key={person.id}
                                className={`absolute ${person.position} w-20 h-20 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center overflow-hidden`}
                            >
                                <img src={person.img} alt="User" className="w-full h-full rounded-full object-cover" />
                               
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          
      <div className="mx-4 md:mx-0">
        {/* Title */}
        
        <h2 className="md:text-4xl text-xl md:pt-8 md:pb-3 pb-1  text-center text-[#8D0B41] font-extrabold">Find new customers</h2>
        <p className=" md:max-w-2xl md:text-base text-sm text-center mx-auto">
          Advertising on Product Hunt helps you grow awareness, trials, and usage of your
          product by reaching millions of the most influential early adopters and techies
          around the globe.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-center gap-4 md:gap-6 mt-5 md:mt-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="md:text-lg font-semibold text-[#8D0B41]">{stat.title}</h3>
              <p className="md:text-base text-sm mt-1">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
            <div className="mx-4 md:mx-0">
        {/* Heading */}
        <h2 className="md:text-4xl text-xl md:pt-8 md:pb-3 pb-1 pt-5 text-center text-[#8D0B41] font-extrabold">Connect with our community</h2>
        <p className=" md:max-w-2xl md:text-base text-sm text-center mx-auto">
        Work with our dedicated team to gain awareness with our most engaged users by
        creating a custom package of advertising options.
        </p>


        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-4 md:mt-8">
          {options.map((option, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition text-left"
            >
              <h3 className="md:text-lg text-[#8D0B41]  font-semibold ">{option.title}</h3>
              <p className="md:text-base text-sm mt-1">{option.description}</p>
            </div>
          ))}
        </div>
      </div>
   
        </div>
    );
};

export default Advertise;
