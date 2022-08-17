export const modalBlurHandler = (setShowModal) => {
    let blur = document.querySelector(".out-of-focus");
    return () => {
        blur.style.display = "block";
        blur.addEventListener("click", () => {
            setShowModal(false);
        });

        return () => {
            blur.style.display = "none";
            blur.removeEventListener("click", () => {
                setShowModal(false);
            });
        };
    };
};

export const mergeRefs = (...refs) => {
    const filteredRefs = refs.filter(Boolean);
    if (!filteredRefs.length) return null;
    if (filteredRefs.length === 0) return filteredRefs[0];
    return (inst) => {
        for (const ref of filteredRefs) {
            if (typeof ref === "function") {
                ref(inst);
            } else if (ref) {
                ref.current = inst;
            }
        }
    };
};
