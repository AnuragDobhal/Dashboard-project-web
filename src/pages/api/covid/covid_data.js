// import { covidData } from "@/lib/CovidDataSymptoms";
// import { NextResponse } from "next/server";

// export function GET(){
//     const data = covidData;
//     return NextResponse.json(data,{status:200});
// }



import { covidData } from "@/lib/CovidDataSymptoms";
import { NextApiResponse } from "next"; 

export default function GET(req, res) {
    const data = covidData;
    res.status(200).json(data);
}
