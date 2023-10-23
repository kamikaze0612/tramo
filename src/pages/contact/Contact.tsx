import Header from "../../ui/Header";
import eiffelImg from "../../assets/eiffel.png";
import libertyImg from "../../assets/liberty.png";
import sydneyImg from "../../assets/sydney.png";
import Footer from "../../ui/Footer";

function Contact() {
  return (
    <div>
      <Header />
      <div className="relative flex h-[calc(100vh-9rem)] grid-cols-1 flex-col gap-4 bg-orange-100 px-12 md:grid md:grid-cols-2 md:px-16 lg:px-24">
        <div className="flex flex-col py-10 md:self-center md:py-20">
          <h2 className="mb-4 text-3xl font-medium text-stone-900 md:text-[52px] lg:text-[74px] xl:text-[98px]">
            Contact Me
          </h2>
          <p className="mb-1 text-sm text-stone-600 md:mt-4 lg:mt-8 lg:text-lg xl:text-xl 2xl:mt-12 2xl:text-3xl">
            <span className="font-semibold text-stone-800">Email:</span>{" "}
            bekhebuyak@gmail.com
          </p>
          <p className="mt-1 w-max text-sm text-stone-600 transition-transform hover:-skew-y-3 hover:skew-x-1 hover:scale-110 hover:shadow-sm md:mt-2 lg:text-lg xl:text-xl 2xl:text-3xl">
            <span className="font-semibold text-stone-800">Github:</span>{" "}
            <a href="https://github.com/kamikaze0612">
              https://github.com/kamikaze0612
            </a>
          </p>
        </div>
        <div className="relative">
          <img
            className="absolute left-1/3 top-[30vh] z-30 w-[240px] lg:w-[320px] xl:w-[500px] "
            src={eiffelImg}
            alt="Illustration of Eiffel tower"
          />
          <img
            className="absolute left-0 top-[20vh]  w-[240px] lg:w-[320px] xl:w-[500px] "
            src={libertyImg}
            alt="Illustration of Statue of Libery"
          />
          <img
            className="absolute left-1/4 top-[10vh]  w-[240px] lg:w-[320px] xl:w-[500px] "
            src={sydneyImg}
            alt="Illustration of Sydney Theatres"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
