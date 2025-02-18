export default function About() {
    return (
        <div className="container mx-auto md:px-4 md:pt-20 md:mb-10 ">
           <div className="mx-4 md:mx-0 ">
           <h2 className="md:text-4xl text-xl md:pt-6 pt-4 md:pb-2 font-extrabold text-[#8D0B41] ">
                About TechDiscoverly
            </h2>
            <p className="md:mb-8 mb-2 md:text-base text-sm mt-1">
                TechDiscoverly is your go-to platform for discovering, sharing, and exploring the latest tech innovations.
                Whether it is web apps, AI tools, mobile applications, software, or games, we provide a space for enthusiasts and professionals
                to connect and contribute to a growing collection of cutting-edge technologies.
            </p>
           </div>

            <div className="space-y-2 md:mb-8 mb-2 mx-4 md:mx-0">
                <h2 className="md:text-4xl text-xl font-extrabold text-[#8D0B41] ">Our Mission</h2>
                <p className="md:text-base text-sm mt-1 ">
                    At TechDiscoverly, we strive to create a community-driven platform where users can actively participate in the tech ecosystem.
                    Our goal is to empower users by providing tools to discover new products, share insights, and engage with the latest trends in technology.
                </p>
            </div>

            <div className="space-y-2 md:mb-8 mb-2 mx-4 md:mx-0">
                <h2 className="md:text-4xl text-xl font-extrabold text-[#8D0B41] "> Key Features</h2>
                <ul className="list-disc list-inside space-y-2 md:text-base text-sm mt-1">
                    <li><strong>Role-Based Access:</strong> Designed for Normal Users, Moderators, and Admins.</li>
                    <li><strong>Innovative Discovery:</strong> Browse, upvote, and review a wide range of tech products.</li>
                    <li><strong>Advanced Moderation:</strong> Maintain high-quality product listings with effective management tools.</li>
                    <li><strong>Premium Access:</strong> Unlock exclusive features through Stripe-powered subscriptions.</li>
                </ul>
            </div>
            <div className="space-y-2 md:mb-8 mb-2 mx-4 md:mx-0">
        <h2 className="md:text-4xl text-xl font-extrabold text-[#8D0B41] ">Contact Us</h2>
        <div className="md:text-base text-sm mt-1">

        <p >info@techdiscoverly.com</p>
        <p >+123 456 7890</p>
        <p >Dhaka, Bangladesh</p>
        </div>
      </div>
        </div>
    );
}
