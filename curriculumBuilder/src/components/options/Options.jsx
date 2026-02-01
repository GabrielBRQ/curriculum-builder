import "./Options.css"

export default function Options({ themeColor, handleColorChange, handleDownload }) {
    return (
        <div className="options">
            <div className="option-item">
                <label className="color-label">
                    Cor
                    <input 
                        type="color" 
                        className="color-picker"
                        value={themeColor} 
                        onChange={(e) => handleColorChange(e.target.value)} 
                    />
                </label>
            </div>

            <div className="option-item">
                <p>PDF</p>
                <button className="download-btn" onClick={handleDownload}>
                    Baixar Currículo
                </button>
            </div>
        </div>
    )
}