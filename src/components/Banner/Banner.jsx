import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Banner = () => {
  return (
    <AutoplaySlider
      play={true}
      interval={6000}
      bullets={false}
      style={{ height: '500px' }}
    >
      <div
        className="w-full h-full bg-cover bg-center backdrop-blur-sm flex justify-center items-center"
        style={{
          backgroundImage: `url('https://fastly.picsum.photos/id/171/1920/1080.jpg?hmac=VDxmgMV8oRXLaOiQxMCNcIiwK2qfHi3yW5nwwnVW5sQ')`,
        }}
      >
        <p className="text-white text-2xl font-bold bg-black bg-opacity-50 p-4 rounded-md">hi</p>
      </div>
      <div
        className="w-full h-full bg-cover bg-center backdrop-blur-sm flex justify-center items-center"
        style={{
          backgroundImage: `url('https://fastly.picsum.photos/id/737/1920/1080.jpg?hmac=aFzER8Y4wcWTrXVx2wVKSj10IqnygaF33gESj0WGDwI')`,
        }}
      >
        <p className="text-white text-2xl font-bold bg-black bg-opacity-50 p-4 rounded-md">hi</p>
      </div>
      <div
        className="w-full h-full bg-cover bg-center backdrop-blur-sm flex justify-center items-center"
        style={{
          backgroundImage: `url('https://fastly.picsum.photos/id/737/1920/1080.jpg?hmac=aFzER8Y4wcWTrXVx2wVKSj10IqnygaF33gESj0WGDwI')`,
        }}
      >
        <p className="text-white text-2xl font-bold bg-black bg-opacity-50 p-4 rounded-md">hi</p>
      </div>
      <div
        className="w-full h-full bg-cover bg-center text-red-800 backdrop-blur-sm flex justify-center items-center"
        style={{
          backgroundImage: `url('https://fastly.picsum.photos/id/171/1920/1080.jpg?hmac=VDxmgMV8oRXLaOiQxMCNcIiwK2qfHi3yW5nwwnVW5sQ')`,
        }}
      >
        <p className="text-white text-2xl font-bold bg-black bg-opacity-50 p-4 rounded-md">hi</p>
      </div>
    </AutoplaySlider>
  );
};

export default Banner;
