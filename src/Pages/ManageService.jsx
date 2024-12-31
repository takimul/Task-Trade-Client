import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { ThemeContext } from "../Provider/ThemeProvider";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";

Modal.setAppElement("#root"); // Required for accessibility

const ManageServices = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Accessing the current theme context
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [updatedService, setUpdatedService] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch user-added services
  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `https://task-trade-server.vercel.app/services?providerEmail=${user.email}`,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          setServices(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching services:", error);
          toast.error("Failed to fetch services.");
          setLoading(false);
        });
    }
  }, [user]);

  // Delete a service
  const handleDelete = async (serviceId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `https://task-trade-server.vercel.app/services/${serviceId}`
          );
          toast.success("Service deleted successfully.");
          setServices((prev) =>
            prev.filter((service) => service._id !== serviceId)
          );

          Swal.fire("Deleted!", "Your service has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting service:", error);
          toast.error("Failed to delete service.");
        }
      }
    });
  };
  // Open the edit modal with prefilled service data
  const handleEdit = (service) => {
    setEditingService(service);
    setUpdatedService({ ...service });
    setModalIsOpen(true);
  };

  // Update a service
  const handleUpdate = async () => {
    if (
      !updatedService.name ||
      !updatedService.description ||
      !updatedService.price
    ) {
      toast.error("All fields are required to update the service.");
      return;
    }

    try {
      const response = await axios.put(
        `https://task-trade-server.vercel.app/services/${editingService._id}`,
        updatedService,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("Service updated successfully.");
        setServices((prev) =>
          prev.map((service) =>
            service._id === editingService._id ? { ...updatedService } : service
          )
        );
        setModalIsOpen(false);
      } else {
        toast.error("Failed to update service.");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("An error occurred while updating the service.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* DaisyUI Spinner */}
        <span className="loading loading-spinner loading-lg text-blue-500"></span>

        {/* Uncomment this to use React Spinners instead */}
        {/* <ClipLoader color="#2563eb" size={50} /> */}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Manage-Services - TaskTrade</title>
      </Helmet>
      <div
        className={`p-5 min-h-screen ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-800"
        }`}
      >
        <h2 className="text-2xl font-bold mb-5">Manage Your Services</h2>
        {services.length === 0 ? (
          <p>No services added yet.</p>
        ) : (
          <div className="grid gap-4">
            {services.map((service) => (
              <div
                key={service._id}
                className={`border p-4 rounded shadow-md flex justify-between items-center ${
                  theme === "dark"
                    ? "bg-gray-800 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <div>
                  <h3 className="text-xl font-bold">{service.name}</h3>
                  <p className="text-gray-500">{service.description}</p>
                  <p className="text-green-500 font-bold">
                    Price: ${service.price}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(service)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editingService && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Edit Service Modal"
            className={`bg-white p-5 rounded shadow-md md:w-1/3 mx-auto mt-20 ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            <h3 className="text-xl font-bold mb-3">Edit Service</h3>
            <input
              type="text"
              value={updatedService.name || ""}
              onChange={(e) =>
                setUpdatedService((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Service Name"
              className={`w-full p-2 border mb-2 ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            />
            <textarea
              value={updatedService.description || ""}
              onChange={(e) =>
                setUpdatedService((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Service Description"
              className={`w-full p-2 border mb-2 ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            ></textarea>
            <input
              type="number"
              value={updatedService.price || ""}
              onChange={(e) =>
                setUpdatedService((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              placeholder="Service Price"
              className={`w-full p-2 border mb-2 ${
                theme === "dark"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            />
            <div className="flex justify-end">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Update
              </button>
              <button
                onClick={() => setModalIsOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};

export default ManageServices;
