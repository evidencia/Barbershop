export const Footer = () => {
  const currentYear = new Date();

  return (
    <div className="w-full bg-secondary px-5 py-6">
      <p className="text-xs font-bold text-gray-400 opacity-75">
        © {`${currentYear.getFullYear()}`} Copyright FSW Barber
      </p>
    </div>
  );
};
