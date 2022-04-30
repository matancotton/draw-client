import React, { useEffect, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas';

const Canvas = ({ canvasRef, allowedDrawing, paths }) => {
    const [eraseMode, setEraseMode] = useState(false)

    const changeEraseMode = (isErase) => {
        canvasRef.current.eraseMode(isErase)
        setEraseMode(isErase)
    }

    useEffect(() => {
        if (!!paths && !!canvasRef && !!canvasRef.current) {
            canvasRef.current.resetCanvas()
            if (paths.length > 0)
                canvasRef.current.loadPaths(paths)
        }
    }, [paths, canvasRef])

    return (
        <div className='canvas'>
            <ReactSketchCanvas
            className='canvas-drawing'
                ref={canvasRef}
                strokeWidth={4}
                strokeColor="black"
                allowOnlyPointerType={allowedDrawing ?"all" : "none"}
            />
            {allowedDrawing &&<div>
                <button className='button red-button' onClick={() => canvasRef.current.resetCanvas()}>reset</button>
                <button className='button red-button' onClick={() => canvasRef.current.undo()}>undo</button>
                <button className={ eraseMode ? "button active" : "button" } onClick={() => changeEraseMode(true)}>eraser</button>
                <button className={ !eraseMode ? "button active" : "button" } onClick={() => changeEraseMode(false)}>pen</button>
            </div>}
        </div>
    )
}

export default Canvas