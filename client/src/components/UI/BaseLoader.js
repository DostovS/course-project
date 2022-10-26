import favicon from 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn1.vectorstock.com%2Fi%2F1000x1000%2F69%2F65%2Fmarket-flat-icon-vector-2216965.jpg&imgrefurl=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fmarket-flat-icon-vector-2216965&tbnid=IyMdMucw2dAB8M&vet=12ahUKEwjAqOKpsf76AhVFtIsKHXZUAo8QMygLegUIARDhAQ..i&docid=Q0fOJKIAE689zM&w=1000&h=1080&q=market%20favicon&ved=2ahUKEwjAqOKpsf76AhVFtIsKHXZUAo8QMygLegUIARDhAQ'
export default function BaseLoader(){
    return <>
        <div className="loader">
            <img src={favicon} alt="" />
        </div>
    </>
}