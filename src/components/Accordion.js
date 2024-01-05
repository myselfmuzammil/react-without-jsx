export const Accordion = ({ onClick, show, children, title, height }) => (
    <div className='px-5 shadow'>
        <button onClick={onClick} className='w-full flex justify-between align-center'>{title} <span className={`font-medium font text-xl transition-transform ${show ? "rotate-180" : "rotate-0"}`}>^</span></button>
        <div className={`overflow-hidden transition-all ease-in-out duration-100`} style={{ height: show ? `${children.length * height}px` : "0px" }}>
            {children}
        </div>
    </div>
);

export default Accordion;