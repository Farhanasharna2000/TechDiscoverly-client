import { MdReportProblem } from "react-icons/md";
import ReportedProductRow from "./ReportedProductRow";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../LoadingSpinner";
import { Helmet } from "react-helmet-async";



const ReportedContents = () => {
   
    const axiosSecure = UseAxiosSecure()
    const {
      data: reports = [],
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['reports'],
      queryFn: async () => {
        const { data } = await axiosSecure(`/reports`)
        return data
      },
    })

 
  
    if (isLoading) return <LoadingSpinner />
    return (
        <div className="container mx-auto px-4 ">
            <Helmet>
        <title> TechDiscoverly | Dashboard | Reported Contents</title>
      </Helmet>
        <h2 className=" pt-6 text-red-600 flex items-center gap-2"><span className=" text-2xl"><MdReportProblem /></span><span className="text-xl md:text-3xl   font-bold">Total Reports :</span>  </h2>
   <div className='my-6 overflow-x-auto shadow rounded-lg '>
             
             <table className='table table-xs table-pin-rows table-pin-cols'>
               <thead>
                
               <tr className="text-center ">
             
                 <th
                 
                   className="px-5 py-3 border-b bg-gray-50 border-gray-200 text-gray-800 text-sm uppercase font-normal"
                 >
                   Product Name
                 </th>
               
                 <th
                 
                   className="px-5 py-3 border-b bg-gray-50 border-gray-200 text-gray-800 text-sm uppercase font-normal"
                 >
                   Action
                 </th>
               </tr>
             </thead>
             <tbody>
               {reports.map((reportedData) => (
                 <ReportedProductRow
                   key={reportedData._id}
                   refetch={refetch}
                   reportedData={reportedData}
                 />
               ))}
             </tbody>
           </table>
         </div>
       </div>
    );
};

export default ReportedContents;