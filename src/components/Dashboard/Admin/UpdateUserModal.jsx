import PropTypes from 'prop-types';
import { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineDown } from 'react-icons/ai';

const roles = ['Admin', 'Moderator', 'User'];

const UpdateUserModal = ({ setIsOpen, isOpen, role, updateRole }) => {
  const [selected, setSelected] = useState(role);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return isOpen ? (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-25">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-medium text-center text-gray-900">Update User Role</h3>

        <div className="mt-4 relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm"
          >
            <span className="block truncate">{selected}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <AiOutlineDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </button>

          {dropdownOpen && (
            <ul className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm">
              {roles.map((role, index) => (
                <li
                  key={index}
                  className={`relative cursor-pointer select-none py-2 pl-10 pr-4 text-gray-900 hover:bg-amber-100 hover:text-amber-900`}
                  onClick={() => {
                    setSelected(role);
                    setDropdownOpen(false);
                  }}
                >
                  <span className={`block truncate ${selected === role ? 'font-medium' : 'font-normal'}`}>
                    {role}
                  </span>
                  {selected === role && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                      <BsCheckLg className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <hr className="mt-16" />

        <div className="flex justify-center gap-5 mt-2">
          <button
            onClick={() => updateRole(selected)}
            type="button"
            className="inline-flex justify-center rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none"
          >
            Update
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

UpdateUserModal.propTypes = {
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  role: PropTypes.string,
  updateRole: PropTypes.func,
};

export default UpdateUserModal;