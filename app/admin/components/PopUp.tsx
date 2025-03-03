import React, { useState } from 'react';

type PopUpProps = {
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>, adData: { title: string; description: string; image: File | null }) => void;
  key: "add" | "edit";
  mode: "add" | "edit";
  onClose: () => void;
  currentData: any;
};

const PopUp: React.FC<PopUpProps> = ({ key, mode, onSubmit, onClose, currentData }) => {
  const [title, setTitle] = useState(currentData?.titulo ?? '');
  const [description, setDescription] = useState(currentData?.descripcion ?? '');
  const [image, setImage] = useState<File | null>(currentData?.imagen ?? '');

  const handleImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      setImage(files[0]);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    onSubmit(e, { title, description, image });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-semibold text-white mb-4">
          {mode === 'edit' ? 'Edit Publication' : 'Add Publication'}
        </h2>
        <div
          className="border-2 border-dashed border-gray-500 p-4 mb-4 flex items-center justify-center rounded-lg hover:border-gray-400 transition-colors"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleImageDrop}
        >
          {image ? (
            <div className="relative">
              <img src={image instanceof File ? URL.createObjectURL(image) : image} alt="Preview" className="max-h-40 rounded-lg" />
              <button
                onClick={() => setImage(null)}
                className="absolute top-1 right-1 bg-gray-600 text-white rounded-full p-1 hover:bg-gray-500"
                style={{ transform: 'translate(50%, -50%)', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                &times;
              </button>
            </div>
          ) : (
            <button
              onClick={() => document.getElementById('fileInput')?.click()}
              className="bg-blue-600 text-white p-2 rounded-lg transition-all hover:bg-blue-500"
            >
              Select or Drag an Image Here
            </button>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={(e) => handleSubmit(e)}
          className="w-full bg-blue-600 text-white p-2 rounded-lg mb-2 transition-all hover:bg-blue-500"
        >
          {mode === 'edit' ? 'Save Changes' : 'Add Publication'}
        </button>
        <button
          onClick={() => {
            onClose();
            setImage(null);
            setDescription('');
            setTitle('');
          }}
          className="w-full bg-gray-600 text-white p-2 rounded-lg transition-all hover:bg-gray-500"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopUp;
