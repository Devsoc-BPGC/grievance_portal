import formFields from "../formFields";
import Component from "../components/Component";

function Dashboard() {
  return (
    <div className="bg-gray-200 min-h-screen">
      <header className="text-8xl font-extrabold text-center ">Mirage</header>
      <div className="flex  flex-wrap w-full">
        {formFields.map((formField, index) => (
          <Component heading={formField.heading} content={formField.content} category={formField.category}/>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
