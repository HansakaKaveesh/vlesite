"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import TextInput from "@/components/TextInput";
import SelectInput from "@/components/SelectInput";
import ToggleButtonGroup from "@/components/ToggleButtonGroup";
import PasswordInput from "@/components/PasswordInput";
import zxcvbn from "zxcvbn";  // Password strength checker

// Helper function for Levenshtein distance (fuzzy matching)
const levenshteinDistance = (a, b) => {
    const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
    matrix[0] = Array.from({ length: a.length + 1 }, (_, i) => i);

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            matrix[i][j] = b[i - 1] === a[j - 1]
                ? matrix[i - 1][j - 1]
                : Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]) + 1;
        }
    }

    return matrix[b.length][a.length];
};

// Check if password is too similar to personal data
const isTooSimilar = (password, personalData) => {
    if (!Array.isArray(personalData)) {
        personalData = [personalData]; // Convert to array if it's a single string
    }

    const threshold = 0.2; // 20% similarity threshold
    return personalData.some(data => {
        const normalizedPassword = password.toLowerCase().replace(/[^a-z0-9]/gi, "");
        const normalizedData = data.toLowerCase().replace(/[^a-z0-9]/gi, "");
        const distance = levenshteinDistance(normalizedPassword, normalizedData);
        const maxAllowedDistance = Math.floor(Math.min(normalizedPassword.length, normalizedData.length) * threshold);
        return distance <= maxAllowedDistance || normalizedPassword.includes(normalizedData);
    });
};

// Simple regex to block overly common or weak passwords
const simplePasswordRegex = /^(1234|password|qwerty|abc123|letmein|1111|0000|12345|welcome|admin)$/i;

// Submit handler
const onSubmit = async (data, watch, router, setLoading) => {
    setLoading(true);
    try {
        const password = data.password;
        const passwordStrength = zxcvbn(password);
        if (passwordStrength.score < 3 || simplePasswordRegex.test(password)) {
            alert("Password is too weak or too common.");
            return;
        }

        // Check if the password is too similar to personal data
        const personalData = [watch("fullName"), watch("email"), watch("phoneNumber")].map(field => field.toLowerCase());
        for (let field of personalData) {
            if (isTooSimilar(password, field)) {
                alert("Password is too similar to your personal information.");
                return;
            }
        }

        // Update the API endpoint URL (use your deployed backend URL here)
        // const apiUrl = "https://fy9bi7j5s4.execute-api.ap-south-1.amazonaws.com/production/register";
        const apiUrl = "http://localhost:5000/register";

        // Send registration data to the backend API
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),  // Send data as JSON
        });

        if (response.ok) {
            alert("Registration successful");
            router.push("/login");  // Redirect to the login page after successful registration
        } else {
            const errorData = await response.json();
            alert(`Registration failed: ${errorData.message || "Unknown error."}`);
        }
    } catch (err) {
        alert(`Error: ${err.message}`);
    } finally {
        setLoading(false);
    }
};

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { control, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm({
        mode: "onChange",
        defaultValues: { userType: "", fullName: "", username: "", country: "", email: "", phoneNumber: "", syllabus: [], courseLevels: {}, subjects: "", password: "" }
    });

    const syllabus = watch("syllabus");
    const courseLevels = watch("courseLevels");
    const subjects = watch("subjects");

    // Function to handle toggle of options for syllabus, course levels, and subjects
    const handleToggle = (field, parentKey, value) => {
        const currentValue = watch(field);
    
        if (field === "syllabus") {
            const updatedSyllabus = currentValue.includes(value)
                ? currentValue.filter(item => item !== value)
                : [...currentValue, value];
            setValue(field, updatedSyllabus);
    
            if (!updatedSyllabus.includes(value)) {
                setValue("courseLevels", {
                    ...watch("courseLevels"),
                    [value]: undefined,
                });
                setValue("subjects", {});
            }
        } else if (field === "courseLevels") {
            const updatedLevels = {
                ...currentValue,
                [parentKey]: currentValue[parentKey]?.includes(value)
                    ? currentValue[parentKey].filter(item => item !== value)
                    : [...(currentValue[parentKey] || []), value],
            };
    
            if (updatedLevels[parentKey]?.length === 0) delete updatedLevels[parentKey];
            setValue(field, updatedLevels);
    
            if (!updatedLevels[parentKey]?.includes(value)) {
                const updatedSubjects = { ...watch("subjects") };
                delete updatedSubjects[`${parentKey}-${value}`];
                setValue("subjects", updatedSubjects);
            }
        } else if (field === "subjects") {
            const updatedSubjects = {
                ...currentValue,
                [parentKey]: currentValue[parentKey]?.includes(value)
                    ? currentValue[parentKey].filter(item => item !== value)
                    : [...(currentValue[parentKey] || []), value],
            };
    
            if (updatedSubjects[parentKey]?.length === 0) delete updatedSubjects[parentKey];
            setValue(field, updatedSubjects);
        }
    };    
    // Function to handle password strength validation
    const validatePassword = (password) => {
        const passwordStrength = zxcvbn(password);
        if (passwordStrength.score < 3 || simplePasswordRegex.test(password)) {
            return "Password is too weak or too common.";
        }

        const personalData = [watch("fullName"), watch("email"), watch("phoneNumber")].map(field => field.toLowerCase());
        for (let field of personalData) {
            if (isTooSimilar(password, field)) {
                return "Password is too similar to your personal information.";
            }
        }

        return null;
    };

    // Submit handler
    const onSubmit = async (data) => {
        setLoading(true); // Set loading to true when the form is being submitted
        try {
            const passwordError = validatePassword(data.password);
            if (passwordError) {
                alert(passwordError);
                return;
            }

            // Update the API endpoint URL (use your deployed backend URL here)
            const apiUrl = "https://fy9bi7j5s4.execute-api.ap-south-1.amazonaws.com/production/register";
            //const apiUrl = "http://localhost:5000/register"; // or your actual endpoint

            // Send registration data to the backend API
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),  // Send data as JSON
            });

            if (response.ok) {
                alert("Registration successful");
                router.push("/login");  // Redirect to the login page after successful registration
            } else {
                const errorData = await response.json();
                alert(`Registration failed: ${errorData.message || "Unknown error."}`);
            }
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally {
            setLoading(false);  // Set loading to false when the request is finished
        }
    };

    return (
        <div className="sticky z-20 top-0 bg-blue-200 text-white shadow-lg px-6 py-4 min-h-screen flex items-center justify-center p-4">
            <div className=" bg-blue-700 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-white mb-4">Registration Form</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* User Type */}
                    <Controller
                        name="userType"
                        control={control}
                        rules={{ required: "User type is required." }}
                        render={({ field }) => <SelectInput id="userType" label="Registering as a" options={["Student", "Teacher", /*"Admin"*/]} error={errors.userType?.message} {...field} />}
                    />
                    {/* Full Name */}
                    <Controller
                        name="fullName"
                        control={control}
                        rules={{ required: "Full name is required." }}
                        render={({ field }) => <TextInput id="fullName" label="Full Name" placeholder="Enter your full name" error={errors.fullName?.message} {...field} />}
                    />
                    {/* Username */}
                    <Controller
                        name="username"
                        control={control}
                        rules={{ required: "Username is required." }}
                        render={({ field }) => <TextInput id="username" label="Username" placeholder="Choose a username" error={errors.username?.message} {...field} />}
                    />
                    {/* Country */}
                    <Controller
                        name="country"
                        control={control}
                        rules={{ required: "Country is required." }}
                        render={({ field }) => <SelectInput id="country" label="Country" options={["Sri Lanka", "India", "Canada", "Australia"]} error={errors.country?.message} {...field} />}
                    />
                    {/* Email */}
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: "Email is required.",
                            pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: "Invalid email address." }
                        }}
                        render={({ field }) => <TextInput id="email" label="Email" placeholder="Enter your email" type="email" error={errors.email?.message} {...field} />}
                    />
                    {/* Phone Number */}
                    <Controller
                        name="phoneNumber"
                        control={control}
                        rules={{
                            required: "Phone number is required.",
                            pattern: {
                                value: /^[0-9]+$/, 
                                message: "Phone number must be digits only."
                            }
                        }}
                        render={({ field }) => (
                            <TextInput
                                id="phoneNumber"
                                label="Phone Number"
                                placeholder="Enter your phone number"
                                type="tel"  // `tel` allows for better formatting for phone numbers
                                inputMode="numeric"  // Suggests a numeric keyboard on mobile devices
                                pattern="[0-9]*"  // Restricts input to digits
                                error={errors.phoneNumber?.message}
                                {...field}
                            />
                        )}
                    />

                    {/* Syllabus */}
                    <ToggleButtonGroup
                        label="Syllabus"
                        options={["Cambridge", "Edexcel"]}
                        selected={syllabus}
                        onToggle={(value) => handleToggle("syllabus", null, value)}
                    />
                    {syllabus.map(syllabusItem => (
                        <div key={syllabusItem}>
                            <ToggleButtonGroup
                                label={`Course Level for ${syllabusItem}`}
                                options={["IAL", "IGCSE", "GCSE"]}
                                selected={courseLevels[syllabusItem] || []}
                                onToggle={(value) => handleToggle("courseLevels", syllabusItem, value)}
                            />
                            {(courseLevels[syllabusItem] || []).map(courseLevel => (
                                <div key={`${syllabusItem}-${courseLevel}`}>
                                    <ToggleButtonGroup
                                        label={`Subjects for ${courseLevel} under ${syllabusItem}`}
                                        options={["ICT", "CS"]}
                                        selected={subjects[`${syllabusItem}-${courseLevel}`] || []}
                                        onToggle={(value) => handleToggle("subjects", `${syllabusItem}-${courseLevel}`, value)}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                    {/* Password */}
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: "Password is required.",
                            minLength: { value: 8, message: "Password must be at least 8 characters long." }
                        }}
                        render={({ field }) => <PasswordInput id="password" label="Password" error={errors.password?.message} {...field} />}
                    />
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full p-2 rounded ${isValid ? "bg-blue-900 hover:bg-blue-800" : "bg-blue-800"} text-white`}
                        disabled={!isValid || loading}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </div>
        </div>
    );
}
