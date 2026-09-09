import {
  useEffect,
  useState,
} from "react";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { Icon } from "@iconify/react";

import { db } from "../../firebase";

import EditorLayout from "../components/EditorLayout";


const ServicesEditor = () => {
  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(
          db,
          "website_content",
          "homepage"
        );

        const snapshot =
          await getDoc(docRef);

        if (snapshot.exists()) {
          setData(
            snapshot.data().services
          );
        }

      } catch (error) {
        console.error(
          "Failed to load services:",
          error
        );
      }
    };

    fetchData();
  }, []);


  const handleSave = async () => {
    setLoading(true);

    try {
      const docRef = doc(
        db,
        "website_content",
        "homepage"
      );

      await updateDoc(
        docRef,
        {
          services: data,
        }
      );

      alert(
        "✅ Services Updated!"
      );

    } catch (error) {
      console.error(
        "Failed to save services:",
        error
      );

      alert(
        "Error saving services."
      );

    } finally {
      setLoading(false);
    }
  };


  const updateItem = (
    index,
    field,
    value
  ) => {
    const newList =
      data.services_list.map(
        (service, serviceIndex) =>
          serviceIndex === index
            ? {
                ...service,
                [field]: value,
              }
            : service
      );

    setData({
      ...data,
      services_list: newList,
    });
  };


  const addItem = () => {
    const newItem = {
      title: "New Service",
      description:
        "Description here",
      icon_key: "knee",
    };

    setData({
      ...data,

      services_list: [
        ...data.services_list,
        newItem,
      ],
    });
  };


  const deleteItem = (index) => {
    if (
      !window.confirm(
        "Are you sure?"
      )
    ) {
      return;
    }

    const newList =
      data.services_list.filter(
        (_, serviceIndex) =>
          serviceIndex !== index
      );

    setData({
      ...data,
      services_list: newList,
    });
  };


  if (!data) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }


  return (
    <EditorLayout
      title="Edit Services"
      onSave={handleSave}
      loading={loading}
    >

      <label className="block mb-6">

        <span className="text-gray-700 font-semibold mb-1 block">
          Section Heading
        </span>

        <input
          value={data.heading}
          onChange={(event) =>
            setData({
              ...data,
              heading:
                event.target.value,
            })
          }
          className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl"
        />

      </label>


      <div className="space-y-4">

        {data.services_list.map(
          (service, index) => (
            <div
              key={`${service.title}-${index}`}
              className="p-4 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-white transition-colors group relative"
            >

              <button
                type="button"
                onClick={() =>
                  deleteItem(index)
                }
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 p-2"
                title="Delete Service"
              >

                <Icon
                  icon="mdi:trash-can-outline"
                  className="text-xl"
                />

              </button>


              <div className="grid md:grid-cols-2 gap-4 pr-10">

                <label>

                  <span className="text-xs font-bold text-gray-500 uppercase">
                    Service Name
                  </span>

                  <input
                    value={service.title}
                    onChange={(event) =>
                      updateItem(
                        index,
                        "title",
                        event.target.value
                      )
                    }
                    className="w-full mt-1 p-2 bg-white border border-gray-200 rounded-lg focus:ring-[#48CEF3] outline-none"
                  />

                </label>


                <label>

                  <span className="text-xs font-bold text-gray-500 uppercase">
                    Icon Type
                  </span>

                  <select
                    value={
                      service.icon_key
                    }
                    onChange={(event) =>
                      updateItem(
                        index,
                        "icon_key",
                        event.target.value
                      )
                    }
                    className="w-full mt-1 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                  >
                    <option value="knee">
                      Knee
                    </option>

                    <option value="fracture">
                      Fracture
                    </option>

                    <option value="running">
                      Sports
                    </option>

                    <option value="scope">
                      Arthroscopy
                    </option>

                    <option value="hip">
                      Pediatric
                    </option>

                    <option value="report">
                      Report
                    </option>

                  </select>

                </label>


                <label className="md:col-span-2">

                  <span className="text-xs font-bold text-gray-500 uppercase">
                    Description
                  </span>

                  <textarea
                    value={
                      service.description
                    }
                    onChange={(event) =>
                      updateItem(
                        index,
                        "description",
                        event.target.value
                      )
                    }
                    rows={2}
                    className="w-full mt-1 p-2 bg-white border border-gray-200 rounded-lg outline-none"
                  />

                </label>

              </div>

            </div>
          )
        )}

      </div>


      <button
        type="button"
        onClick={addItem}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:border-[#48CEF3] hover:text-[#48CEF3] hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
      >

        <Icon
          icon="mdi:plus"
          className="text-2xl"
        />

        Add New Service

      </button>

    </EditorLayout>
  );
};


export default ServicesEditor;