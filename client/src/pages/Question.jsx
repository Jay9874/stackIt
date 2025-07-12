import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import Editor from '../components/Editor'
import TagsInput from '../components/TagsInput'

export default function Question() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [isLoading, setLoading] = useState(false);

    const editorRef = useRef(null);
    const selectionRef = useRef(null);
    const pendingImagesRef = useRef([]);

    const handleSave = async () => {
        const extractPlainText = (html) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            return tempDiv.textContent.replace(/\u00a0/g, '').trim();
        };

        if (!title.trim()) {
            return toast.error('Title is required');
        }

        const plainText = extractPlainText(description);
        if (!plainText) {
            return toast.error('Description cannot be empty');
        }

        if (tags.length === 0) {
            return toast.error('Please add at least one tag');
        }

        setLoading(true);

        try {
            let html = description;

            for (const { file, blobUrl } of pendingImagesRef.current) {
                const formData = new FormData();
                formData.append('image', file);

                const response = await fetch('http://localhost:5000/api/questions/upload-image', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Image upload failed');
                }

                const data = await response.json();
                const serverUrl = data.url;
                html = html.replaceAll(blobUrl, serverUrl);
            }

            const saveRes = await fetch('http://localhost:5000/api/questions/save-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title,
                    description: html,
                    tags
                })
            });

            if (!saveRes.ok) {
                const errorData = await saveRes.json();
                throw new Error(errorData.message || 'Failed to save question');
            }

            toast.success('Question saved successfully!');
            pendingImagesRef.current = [];
            navigate('/');
        }
        catch (err) {
            toast.error(err.message || 'An error occurred while saving the question');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className='py-8 px-24'>
            <div className='mb-4 w-full'>
                <p className='mb-2'>Title</p>
                <div className='w-full flex items-center gap-1 focus-within:border-amber-500 rounded-lg p-2 border-1 border-gray-300'>
                    <input
                        className='w-full border-none focus:border-none focus:outline-none'
                        type='text'
                        placeholder='Enter your Question Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            </div>

            <div className='mb-4 w-full'>
                <p className='mb-2'>Description</p>
                <Editor
                    editorRef={editorRef}
                    content={description}
                    setContent={setDescription}
                    selectionRef={selectionRef}
                    pendingImagesRef={pendingImagesRef}
                />
            </div>

            <TagsInput
                tags={tags}
                setTags={setTags}
            />

            <button
                disabled={isLoading}
                onClick={handleSave}
                className={`${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600 cursor-pointer'} mt-6 px-4 py-2 text-white rounded`}
            >
                {isLoading ? 'Posting...' : 'Post Question'}
            </button>
        </div>
    )
}