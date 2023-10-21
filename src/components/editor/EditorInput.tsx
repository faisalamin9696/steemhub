import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';
import { HotKeys } from 'react-hotkeys';
import EditorToolbar from './EditorToolbar';
import { Input } from '@mui/material';
import { MAXIMUM_UPLOAD_SIZE, isValidImage } from '../../utils/helpers/image';
import Dropzone from 'react-dropzone';

import { FaIcons } from 'react-icons/fa'

interface EditorProps {
    value: string,
    inputId: string,
    addon: React.ReactNode,
    inputRef?: (input: any) => void,
    onChange: (value: string) => void,
    onImageUpload: (blon: any,
        insertionStatus: (image: any, imageName: string) => void,
        setImageState: () => void) => void,
    onImageInvalid: () => void,
}

const hotkeys = {
    h1: 'ctrl+shift+1',
    h2: 'ctrl+shift+2',
    h3: 'ctrl+shift+3',
    h4: 'ctrl+shift+4',
    h5: 'ctrl+shift+5',
    h6: 'ctrl+shift+6',
    bold: 'ctrl+b',
    italic: 'ctrl+i',
    quote: 'ctrl+q',
    link: 'ctrl+k',
    image: 'ctrl+m',
};

const EditorInput = (props: EditorProps) => {
    const {
        addon,
        value,
        inputId,
        inputRef,
        onImageUpload,
        onImageInvalid,
        onChange
    } = props;
    const [imageState, setImageState] = useState(
        {
            imageUploading: false,
            dropzoneActive: false,
        }
    );
    const postInput = useRef<any>(null);

    let [originalInput, setOriginalInput] = useState(null);

    const { dropzoneActive } = imageState;

    useEffect(() => {
        if (postInput) {
            postInput?.current?.addEventListener('paste', handlePastedImage);
        }
    });


    // function updateInput(input1) {
    //     console.log(1414, postInput)
    //     if (input1) {
    //         setOriginalInput(input1)
    //         // eslint-disable-next-line react/no-find-dom-node
    //         inputRef(postInput);
    //     }
    // }
    function setValue(value: string, start?: number, end?: number) {
        onChange(value);
        if (start && end) {
            setTimeout(() => {
                postInput?.current?.setSelectionRange(start, end);
            }, 0);
        }
    }

    function insertAtCursor(before: string, after: string, deltaStart = 0, deltaEnd = 0) {
        if (!postInput) return;

        const { value } = props;
        console.log(1122, postInput.current)

        const startPos = postInput?.current?.selectionStart;
        const endPos = postInput?.current?.selectionEnd;
        const newValue =
            value.substring(0, startPos) +
            before +
            value.substring(startPos, endPos) +
            after +
            value.substring(endPos, value.length);

        setValue(newValue, startPos + deltaStart, endPos + deltaEnd);
    }

    function disableAndInsertImage(image: any, imageName = 'image') {
        setImageState({
            ...imageState,
            imageUploading: false,
        });
        insertImage(image, imageName);
    }

    function insertImage(image: any, imageName = 'image') {
        if (!postInput) return;

        const { value } = props;

        const startPos = postInput?.current?.selectionStart;
        const endPos = postInput?.current?.selectionEnd;
        const imageText = `![${imageName}](${image})\n`;
        const newValue = `${value.substring(0, startPos)}${imageText}${value.substring(
            endPos,
            value.length,
        )}`;
        resizeTextarea();
        setValue(newValue, startPos + imageText.length, startPos + imageText.length);
    }

    function insertCode(type: string) {
        if (!postInput) return;
        postInput?.current?.focus();

        switch (type) {
            case 'h1':
                insertAtCursor('# ', '', 2, 2);
                break;
            case 'h2':
                insertAtCursor('## ', '', 3, 3);
                break;
            case 'h3':
                insertAtCursor('### ', '', 4, 4);
                break;
            case 'h4':
                insertAtCursor('#### ', '', 5, 5);
                break;
            case 'h5':
                insertAtCursor('##### ', '', 6, 6);
                break;
            case 'h6':
                insertAtCursor('###### ', '', 7, 7);
                break;
            case 'b':
                insertAtCursor('**', '**', 2, 2);
                break;
            case 'i':
                insertAtCursor('*', '*', 1, 1);
                break;
            case 'q':
                insertAtCursor('> ', '', 2, 2);
                break;
            case 'link':
                insertAtCursor('[', '](url)', 1, 1);
                break;
            case 'image':
                insertAtCursor('![', '](url)', 2, 2);
                break;
            default:
                break;
        }

        resizeTextarea();
    }

    function resizeTextarea() {
        if (originalInput)
            console.log(888, originalInput)
        return
        originalInput.resize();

    }

    const handlers = {
        h1: () => insertCode('h1'),
        h2: () => insertCode('h2'),
        h3: () => insertCode('h3'),
        h4: () => insertCode('h4'),
        h5: () => insertCode('h5'),
        h6: () => insertCode('h6'),
        bold: () => insertCode('b'),
        italic: () => insertCode('i'),
        quote: () => insertCode('q'),
        link: (e: any) => {
            e.preventDefault();
            insertCode('link');
        },
        image: () => insertCode('image'),
    };

    function handlePastedImage(e: any) {
        if (e.clipboardData && e.clipboardData.items) {
            const items = e.clipboardData.items;
            Array.from(items).forEach((item: any) => {
                if (item.kind === 'file') {
                    e.preventDefault();

                    const blob = item.getAsFile();

                    if (!isValidImage(blob)) {
                        onImageInvalid();
                        return;
                    };

                    setImageState({
                        ...imageState,
                        imageUploading: true,
                    });

                    onImageUpload(blob, disableAndInsertImage, () =>
                        setImageState({
                            ...imageState,
                            imageUploading: false,
                        })

                    );
                }
            });
        }
    }

    function handleImageChange(e: any) {
        if (e.target.files && e.target.files[0]) {
            if (!isValidImage(e.target.files[0])) {
                onImageInvalid();
                return;
            }

            setImageState({
                ...imageState,
                imageUploading: true,
            });


            onImageUpload(e.target.files[0], disableAndInsertImage, () =>
                setImageState({
                    ...imageState,
                    imageUploading: false,
                })
            );
            e.target.value = '';
        }
    }

    function handleDrop(files: any[]) {
        if (files.length === 0) {
            setImageState({
                ...imageState,
                dropzoneActive: false,
            });
            return;
        }

        setImageState({
            imageUploading: true,
            dropzoneActive: false,
        });

        let callbacksCount = 0;
        Array.from(files).forEach(item => {
            onImageUpload(
                item,
                (image: any, imageName: string) => {
                    callbacksCount += 1;
                    insertImage(image, imageName);
                    if (callbacksCount === files.length) {

                        setImageState({
                            ...imageState,
                            imageUploading: false,
                        });

                    }
                },
                () => {
                    setImageState({
                        ...imageState,
                        imageUploading: false,
                    });


                },
            );
        });
    }


    function handleDragEnter() {
        setImageState({
            ...imageState,
            dropzoneActive: true,
        });
    }

    function handleDragLeave() {
        setImageState({
            ...imageState,
            dropzoneActive: false,
        });
    }

    function handleChange(e: any) {
        const { value } = e.target;
        setValue(value);
    }


    return (
        <React.Fragment  >
            <EditorToolbar onSelect={insertCode} />
            <div className='ring-1 m-1 mt-[-3px]'>

                <Dropzone onDrop={handleDrop}
                    noClick
                    // accept="image/*"
                    maxSize={MAXIMUM_UPLOAD_SIZE}
                    onDropRejected={onImageInvalid}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}

                >
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div >
                                {dropzoneActive && (
                                    <div className="EditorInput__dropzone">
                                        <div>
                                            <i className="iconfont icon-picture" />
                                            <FormattedMessage id="drop_image" defaultMessage="Drop your images here" />
                                        </div>
                                    </div>
                                )}
                                <HotKeys keyMap={hotkeys} handlers={handlers}>
                                    <textarea
                                        className='w-full bg-transparent p-4'
                                        rows={12}
                                        {...props}
                                        onChange={handleChange}
                                        value={value}
                                        ref={postInput}
                                    />
                                </HotKeys>
                            </div>
                        </section>
                    )}
                </Dropzone>

            </div>
            <p >
                <input
                    type="file"
                    id={inputId || 'inputfile'}
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <div>
                    <label htmlFor={inputId || 'inputfile'}>
                        {/* <FaIcons  /> */}
                        {/* {imageState.imageUploading ? (
                        <Icon type="loading" />
                    ) : (
                        <i className="iconfont icon-picture" />
                    )} */}
                        {imageState.imageUploading ? (
                            <FormattedMessage id="image_uploading" defaultMessage="Uploading your image..." />
                        ) : (
                            <FormattedMessage
                                id="select_or_past_image"
                                defaultMessage="Select image or paste it from the clipboard."
                            />
                        )}
                    </label>
                    <label htmlFor="reading_time" className=" float-right">
                        {addon}
                    </label>
                </div>
            </p>
        </React.Fragment>
    );
}

export default EditorInput


{/* <div className="EditorInput__dropzone-base">
<Dropzone
    disableClick
    style={{}}
    accept="image/*"
    maxSize={MAXIMUM_UPLOAD_SIZE}
    onDropRejected={onImageInvalid}
    onDrop={handleDrop}
    onDragEnter={handleDragEnter}
    onDragLeave={handleDragLeave}
>
    {dropzoneActive && (
        <div className="EditorInput__dropzone">
            <div>
                <i className="iconfont icon-picture" />
                <FormattedMessage id="drop_image" defaultMessage="Drop your images here" />
            </div>
        </div>
    )}
    <HotKeys keyMap={hotkeys} handlers={handlers}>
        <Input
            {...props}
            onChange={handleChange}
            value={value}
            ref={setInput}
        />
    </HotKeys>
</Dropzone>
</div>
<p className="EditorInput__imagebox">
<input
    type="file"
    id={inputId || 'inputfile'}
    accept="image/*"
    onChange={handleImageChange}
/>
<label htmlFor={inputId || 'inputfile'}>
 
    {imageState.imageUploading ? (
        <FormattedMessage id="image_uploading" defaultMessage="Uploading your image..." />
    ) : (
        <FormattedMessage
            id="select_or_past_image"
            defaultMessage="Select image or paste it from the clipboard."
        />
    )}
</label>
<label htmlFor="reading_time" className="EditorInput__addon">
    {addon}
</label>
</p> */}