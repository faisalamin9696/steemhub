import { Form, Input } from 'antd'
import React, { useState } from 'react'
import EditorInput from '../../../components/editor/EditorInput';
import { FormattedMessage } from 'react-intl';
import MainWrapper from '../../../components/wrapper/MainWrapper';

function PostingPage() {
    const [value, setValue] = useState();

    function handleChange(e: any) {
        // const { value } = e.target;
        setValue(e);
    }
    return (
        <MainWrapper>
            <Form className=' '>
                <EditorInput
                    // rows={12}
                    addon={<FormattedMessage
                        id="reading_time"
                        defaultMessage={'{words} words / {min} min read'}
                        values={{
                            words: 1,
                            min: Math.ceil(1),
                        }} />}
                    onChange={handleChange}
                    onImageUpload={() => { }}
                    onImageInvalid={() => { }}
                    inputId={'editor-inputfile'}
                    value={value}
                    inputRef={(ref) => {

                    }}
                />

            </Form>

        </MainWrapper>
    )
}

export { PostingPage }