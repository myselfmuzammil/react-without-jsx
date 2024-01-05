export const ArrowButton = ({ className, ...props }) => (
    <button className={`z-10 rounded-full w-7 h-7 p-[7px] bg-black ${className}`} {...props}>
        <div className='border rotate-45 translate-y-px translate-x-px origin-left bg-white'></div>
        <div className='border -rotate-45 translate-y-px translate-x-px origin-left bg-white'></div>
    </button>
);

export default ArrowButton;