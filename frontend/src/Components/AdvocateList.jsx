const AdvocateList = ({ user }) => {
  const { name, RegNo, COPNo, Jila, createdAt, AdPractice, Gender } = user;

  return (
    <div
      className="flex flex-col md:flex-row justify-between items-center mb-4 bg-white shadow-md p-4 rounded-xl hover:bg-blue-50"
    >
      <div className="text-center md:w-[20%] text-blue-900 font-medium">
        <span className="block md:hidden font-bold">Name:</span>
        {name || 'N/A'}
      </div>
      <div className="text-center md:w-[7%] text-blue-800">
        <span className="block md:hidden font-bold">RegNo:</span>
        {RegNo || 'N/A'}
      </div>
      <div className="text-center md:w-[7%] text-blue-800">
        <span className="block md:hidden font-bold">COPNo:</span>
        {COPNo || 'N/A'}
      </div>
      <div className="text-center md:w-[15%] text-blue-800">
        <span className="block md:hidden font-bold">Jila:</span>
        {Jila || 'N/A'}
      </div>
      <div className="text-center md:w-[15%] text-blue-800">
        <span className="block md:hidden font-bold">AdPractice:</span>
        {AdPractice || 'N/A'}
      </div>
      <div className="text-center md:w-[7%] text-blue-800">
        <span className="block md:hidden font-bold">Gender:</span>
        {Gender || 'N/A'}
      </div>
      <div className="text-center md:w-[25%] text-blue-800">
        <span className="block md:hidden font-bold">Created At:</span>
        {new Date(createdAt).toLocaleDateString() || 'N/A'}
      </div>
    </div>
  );
};

export default AdvocateList;
