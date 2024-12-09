import { InputLabel } from "@/components/ui/input-label";

function PasswordSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Password Change</h2>
      <div className="space-y-4">
        <InputLabel
          label="Current Password"
          type="password"
          placeholder="Enter current password"
        />
        <InputLabel
          label="New Password"
          type="password"
          placeholder="Enter new password"
        />
        <InputLabel
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
        />
      </div>
    </div>
  );
}

export default PasswordSection;
