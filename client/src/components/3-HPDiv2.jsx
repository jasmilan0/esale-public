export default function HPDiv2() {
  return (
    <div className="flex flex-col items-center gap-y-10 px-20 mt-8 mb-24">
      <div className="pt-10 px-4">
        <p className="text-5xl text-center font-light">
          {" "}
          The all‑in‑one system to help your business thrive
        </p>
      </div>
      <div className="grid sm:grid-rows-4 md:grid-cols-2 md:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 gap-10">
        <div className="flex flex-col justify-center items-center">
          <img className="w-20 h-20" src="/pic2.svg" alt="" />
          <div className="font-bold">Easier Payments</div>
          <div className="text-center font-light">
            Accepting any type of payments is a snap—from in-person swipe, chip,
            and tap, to online payments.
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <img className="w-20 h-20" src="/pic3.svg" alt="" />
          <div className="font-bold">Tighter tracking</div>
          <div className="text-center font-light">
            Whether you sell coffee or memberships, all purchases are more
            secure and trackable.
          </div>
        </div>
        <div className="flex flex-col  justify-center items-center">
          <img className="w-20 h-20" src="/pic4.svg" alt="" />
          <div className="font-bold">Happier customers</div>
          <div className="text-center font-light">
            Offer the best possible customer experience while building loyalty
            at your place of business and online.
          </div>
        </div>
        <div className="flex flex-col  justify-center items-center">
          <img className="w-20 h-20" src="/pic5.svg" alt="" />
          <div className="font-bold">More flexibility</div>
          <div className="text-center font-light">
            Manage your business and make a sale from anywhere with our
            dashboard, mobile app, and virtual terminal.
          </div>
        </div>
      </div>
    </div>
  );
}
