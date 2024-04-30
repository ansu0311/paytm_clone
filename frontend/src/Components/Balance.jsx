import { Heading } from "./Heading";
import { CircleInitials } from "./CircleInitials";
import { ButtomDashboard } from "./Button";

export const Balance = ({ balance, firstName, lastName, setPage }) => {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <Heading label={"Total Balance"} /> 
          <CircleInitials firstName={firstName} lastName={lastName} />
        </div>
        <div className=" font-semibold text-teal-300 text-5xl leading-8 flex items-center">
          ₹{balance}
          <button
            onClick={() => setRefresh(true)}
            className="h-full hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 ml-2 mt-2"
            >
              <path
                fillRule="evenodd"
                d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Send Money Button */}
        <div className="flex w-1/5 h-auto gap-2 my-5">
          <ButtomDashboard
            label={
              <div
                className="flex gap-1 justify-center"
                onClick={() => setPage("Users")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 my-auto"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.25 3.75H19.5a.75.75 0 0 1 .75.75v11.25a.75.75 0 0 1-1.5 0V6.31L5.03 20.03a.75.75 0 0 1-1.06-1.06L17.69 5.25H8.25a.75.75 0 0 1 0-1.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>Send</div>
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};
