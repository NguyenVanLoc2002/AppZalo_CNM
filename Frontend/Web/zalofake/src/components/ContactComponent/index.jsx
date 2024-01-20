import ContactMenu from "../ContactMenu";

function ContactComponent() {
  return (
    <>
      <div className="bg-gray-200 h-screen w-full">
        <div className="h-full w-full sm:w-96 bg-cyan-100">
          <ContactMenu />
        </div>
      </div>
    </>
  );
}

export default ContactComponent;
